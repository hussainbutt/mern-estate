import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import listingRouter from './routes/listing.route.js'
import path from "path";
dotenv.config();
mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to DB");
}).catch((err) => {
    console.log("ERROR WHILE CONNECTING TO DB");
});
const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.listen(3000, () => {
    console.log('Server is running on port 3000');

})



app.use(express.static(path.join(__dirname, '/client/dist')));

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});
//Lets make a middleware for error handling
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const errorMessage = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success: false,
        statusCode,
        errorMessage,
    })
})