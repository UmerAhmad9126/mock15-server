const express = require('express');
const { connection } = require('./config/db');
require('dotenv').config();
const cors = require("cors");
const { userRouter } = require('./routers/userRouter');
const { authmiddleware } = require('./middleware/authMiddleware');
const { boardRouter } = require('./routers/boardRouter');


const app = express();
app.use(cors());
app.use(express.json());


app.use("/user", userRouter);
app.use(authmiddleware);
app.use("/board", boardRouter);



app.listen(process.env.PORT, async () => {

    try {
        await connection
        console.log("Connected to mongoDB");

    } catch (error) {
        console.log('error:', error)
    }

    console.log("Server listening on port " + process.env.PORT)
});