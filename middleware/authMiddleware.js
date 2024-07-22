import jwt from 'jsonwebtoken'
import User from '../models/User.js'


export const protect = async (req, res, next) => {
    let token;

    token = req.cookies.user_token;

    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            req.user = await User.findById(decoded.id).select('-password');

            next();

        } catch (error) {
            res.status(401).json("Not authorized, invalid token");
        }

    }else{
        res.status(401).json("Not authorized, no token");
    }
}

export const protectSeller = async (req, res, next) => {
    let token;

    token = req.cookies.seller_token;

    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            req.user = await User.findById(decoded.id).select('-password');

            if(decoded.role != 'SELLER'){
                res.status(401).json("Not authorized, not a seller");
            }

            next();

        } catch (error) {
            res.status(401).json("Not authorized, invalid token seller");
        }

    }else{
        res.status(401).json("Not authorized, no token");
    }
}

