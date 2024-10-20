import mongoose from "mongoose";

const userSchema2 = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true }
)

const UserExample = mongoose.model('UserExample', userSchema2);

export default UserExample;