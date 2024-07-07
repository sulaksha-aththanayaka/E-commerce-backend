import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import roles from '../utils/roles.js'

export const registerUser = async (req, res) => {
    const {username, email, password} = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = new User({
        username, 
        email, 
        password: hashedPassword,
        role: roles.user
    });

    await user.save();
    res.status(200).json("User is registered");
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

    const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '30m'});

    const {password, ...otherDetails} = req.body;

    res.cookie('user_token', token, {
        httpOnly: true
    }).status(200).json({...otherDetails});
}



