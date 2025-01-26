
import UserExample from "../models/userData.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    const { userName, email, password } = req.body;
    console.log(userName + " : " + email + " : " + password);
    const encryptedPassword = bcryptjs.hashSync(password, 10);


    try {
        const newUser = new UserExample({ userName, email, password: encryptedPassword });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        next(error);
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await UserExample.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, "User not found!"))
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, "Invalid Credentials!"))
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_KEY);
        const { password: pass, ...rest } = validUser._doc;
        res.cookie("access_token", token, { httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000) })
            .status(200)
            .json(rest);
    } catch (error) {
        next(error)
    }
}