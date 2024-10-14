import jwt from 'jsonwebtoken';
import {ENV_VARS} from '../config/envVars.js';

export const generateTokenAndSetCookie = (userId,res) => {
    const token = jwt.sign({userId},ENV_VARS.JWT_SECRET,{expiresIn:"15d"});

    res.cookie("jwt-watchly",token,{
        maxAge:15*24*60*60*1000, // 15d is ms
        httpOnly:true, //prevents XSS attack
        sameSite:"strict", // prevents CSRF attack
        secure:ENV_VARS.NODE_ENV !=="development"
    });

    return token;
}