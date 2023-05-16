const express = require('express');
const { UserModel } = require('../models/userSchema');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

// signup user
userRouter.post("/signup", (req, res) => {

    const { email, password } = req.body;

    try {
        bcrypt.hash(password, 5, async (err, hash) => {

            let user = new UserModel({ email, password: hash });
            await user.save();
            res.status(200).send({ "msg": "SignUp Success" })

        });
    } catch (error) {
        console.log('error:', error);
        res.status(400).send({ "msg": error.message });
    }
});


// login user
userRouter.post("/login", async (req, res) => {

    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });

        if (user) {

            bcrypt.compare(password, user.password, function (err, result) {

                if (result) {
                    res.status(200).send({
                        msg: "Login successful", token: jwt.sign({ foo: 'bar' }, "masai")
                    })

                }
                else {
                    res.status(400).send({ "msg": "Wrong Credentials" });
                }
            });
        }
        else {
            res.status(400).send({ "msg": "Wrong Credentials" });
        }
    } catch (error) {
        console.log('error:', error);
        res.status(400).send({ "msg": error.message });
    }
});






module.exports = {
    userRouter
}