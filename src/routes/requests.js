const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth")


requestRouter.post("/sendConnectionRequest", userAuth ,async(req, res)=> {
    const user = req.user;
    //sending a connection request
    console.log("sendong a connection request");
    res.send(user.firstName + " sending the request!!!");
});


module.exports = requestRouter;