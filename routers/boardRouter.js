
const express = require('express');
const { BoardModel } = require('../models/boardSchema');


const boardRouter = express.Router();

boardRouter.post("/add", async (req, res) => {
    const payload = req.body;

    try {
        let board = new BoardModel(payload);
        await board.save();
        res.status(200).send({ 'msg': "A new Board will be added" })

    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
});




module.exports = {
    boardRouter
}