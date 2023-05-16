
const jwt = require("jsonwebtoken");

const authmiddleware = (req, res, next) => {

    const token = req.headers.authorization;

    if (token) {
        const decode = jwt.verify(token, "masai");
        if (decode) {
            next();
        }
        else {
            res.status(400).send({ "msg": "Login Required" });
        }
    }
    else {
        res.status(400).send({ "msg": "Login Required" });
    }

};


module.exports = {
    authmiddleware
}