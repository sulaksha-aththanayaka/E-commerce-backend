import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import roles from '../utils/roles.js'
import Seller from '../models/Seller.js'

export const registerUser = async (req, res) => {
    const {username, email, password} = req.body;

    const OldUser = await User.findOne({email});

    if(OldUser){
       return res.status(401).json("User available");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create user
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        role: roles.user
    });

    // await user.save();

    res.json({
        _id: user.id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id, user.role)
    });
}

export const loginUser = async (req, res) => {

    const user = await User.findOne({email: req.body.email});

    console.log(user);

    if(!user){
        return res.status(400).json("User not found");
    }

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

    if(!isPasswordCorrect){
        return res.status(400).json("Incorrect username or password");
    }

    const token = generateToken(user._id, user.role);

    res.cookie('user_token', token, {
        httpOnly: true,
        secure: false
    }).status(200).json({
        _id: user.id,
        username: user.username,
        email: user.email,
        token: token
    });
}

export const logoutUser = async (req, res) => {
    res.cookie('user_token', '', {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({message: 'User logged out'});
}

export const getMe = async (req, res) => {
    res.status(200).json(req.user)
}

const generateToken = (id, role) => {

    let token = jwt.sign({id, role}, process.env.JWT_SECRET, {expiresIn: '30m'});

    return token;

}


export const registerSeller = async (req, res) => {
    const {businessName, sellerName, email, password} = req.body;

    if(!businessName || !sellerName || !email || !password){
        res.status(401).json("All the fields are required");
    }

    const oldSeller = await Seller.findOne({email});

    if(oldSeller){
        return res.status(401).json("Seller already exists");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const seller = await Seller.create({
        businessName,
        sellerName,
        email,
        password: hashedPassword,
        role: roles.seller
    });

    const token = generateToken(seller._id, seller.role);

    res.cookie('seller_token', token, {
        httpOnly: true,
        secure: false
    }).status(200).json({
        _id: seller.id,
        username: seller.username,
        email: seller.email,
        token: token
    });

}
