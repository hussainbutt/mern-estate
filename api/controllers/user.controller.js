import bcrypt from 'bcryptjs';
import UserExample from '../models/userData.model.js';
import { errorHandler } from '../utils/error.js';
import { signOutStart } from '../../client/src/redux/user/userSlice.js';
import Listing from '../models/listing.model.js';
export const test = (req, res) => {
    res.json({ message: 'API is up!' });
}

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, "You can only update your own account!"));
    try {
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }
        const updatedUser = await UserExample.findByIdAndUpdate(req.params.id, {
            $set: {
                userName: req.body.userName,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        }, { new: true })
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (err) {
        next(err);
    }
}
export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, "You can only delete your own account!"));
    try {
        await UserExample.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json({ message: "User deleted successfully." });
    } catch (err) {
        next(err);
    }
}

export const signOut = async (req, res, next) => {
    try {
        res.clearCookie('access_token');
        return res.status(200).json({ message: "Logged out successfully." });
    } catch (error) {

        next(error);
    }

}
export const getUserListings = async (req, res, next) => {
    if (req.user.id === req.params.id) {
        try {
            const listings = await Listing.find({ userRef: req.params.id });

            res.json(listings).status(200);
        } catch (error) {
            next(error);
        }
    } else {
        return next(errorHandler(401, "You can only view your own listings!"));
    }
}
export const getUser = async (req, res, next) => {
    try {
        const user = await UserExample.findById(req.params.id);

        if (!user) return next(errorHandler(404, "User not found!"));

        const { password: pass, ...rest } = user._doc;
        res.json(rest);
    } catch (error) {
        next(error);
    }

}
