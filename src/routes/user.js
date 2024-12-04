const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require('../models/user');
const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName photoUrl age gender skills";


userRouter.get("/user/requests/received", userAuth, async(req,res) =>{
    const loggedInUser = req.user;


    try {
        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",



        }).populate("fromUserId", USER_SAFE_DATA);

        res.json({message: "data fetched successfully", data : connectionRequest});
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            message: "the get request was not succesfull",
            error: err.message 
        });
      }
});


userRouter.get("/user/connections", userAuth, async(req,res) => {


    try {
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({

            $or: [
                {toUserId: loggedInUser._id, status: "accepted"},
                {fromUserId: loggedInUser._id, status: "accepted"},
            ]


        }).populate("fromUserId", USER_SAFE_DATA)
          .populate("toUserId", USER_SAFE_DATA);

        const data = connectionRequest.map((row) => {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString())  {
                 return row.toUserId
            }
            row.fromUserId
        });

        res.json({data});






        
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            message: "the get request was not succesfull",
            error: err.message 
        });
      }
}); 


userRouter.get("/feed", userAuth, async(req,res)=> {

    try {
       const loggedInUser = req.user;

       const page = parseInt(req.query.page) || 1;
       let limit = parseInt(req.query.limit) || 10;
        limit = limit>50 ? 50 : limit;
       const skip = (page-1)*limit
       







       const connectionRequest = await ConnectionRequest.find({
        $or:[
            {fromUserId: loggedInUser._id},
            {toUserId: loggedInUser._id, status: "accepted"}

        ]
       });
       

       const excludedUserIds = new Set();
        excludedUserIds.add(loggedInUser._id.toString()); // Exclude self
        connectionRequest.forEach(req => {
            excludedUserIds.add(req.fromUserId.toString());
            excludedUserIds.add(req.toUserId.toString());
        });

        const feedUsers = await User.find({
            _id: { $nin: Array.from(excludedUserIds) }
        }).select(USER_SAFE_DATA).skip(skip).limit(limit);
        
        res.json({ message: "Feed data fetched successfully", data: feedUsers });
    } 
        
     catch (err) {
        console.error(err);
        res.status(500).json({ 
            message: "the get request was not succesfull",
            error: err.message 
        });
      }

});












module.exports = userRouter;
