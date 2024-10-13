import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to DB");
}).catch((err) => {
    console.log("ERROR WHILE CONNECTING TO DB");
});


const app = express();
app.get('/', (req, res) => {
    res.
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');

})