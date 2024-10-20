
import UserExample from "../models/userData.model.js";
import bcryptjs from "bcryptjs";

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