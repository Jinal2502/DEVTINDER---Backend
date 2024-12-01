const jwt = require('jsonwebtoken');
// const { User } = require("../models/user")
const User = require("../models/user"); // If not using named exports




const userAuth = async (req, res, next) => {

    try {
    const {token} = req.cookies;
    if(!token) {
        throw new Error(" TOKEN IS NOT VALID!!!!!!!!!")
    }

    const decodedObj = await jwt.verify(token,"DEV@TINDER$25022006");

    const {_id} = decodedObj;

    const user = await User.findById(_id);
    if(!user) {
        throw new Error ("User not found");
    }
    req.user = user;
    next();
        
    } catch (err) {
        res.status(400).send("ERROR" + err.message);
    }
      
};

module.exports = {
    userAuth,
};   