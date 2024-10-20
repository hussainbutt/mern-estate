import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/user.route.js';
import signUp from './routes/auth.route.js';
dotenv.config();
mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to DB");
}).catch((err) => {
    console.log("ERROR WHILE CONNECTING TO DB");
});


const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');

})




app.use("/api/user", userRoute);
app.use("/api/auth", signUp);

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