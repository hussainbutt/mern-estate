import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';
import dotenv from 'dotenv';

export const verifyToken = (req, res, next) => {
    dotenv.config();
    const token = req.cookies.access_token;
    if (!token) return next(errorHandler(401, "Unauthorized"));
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if (err) return next(errorHandler(403, "Invalid Token"));
        console.log(req);
        req.user = user;
        next();
    })

}