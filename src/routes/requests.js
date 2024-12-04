const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth")
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');
const mongoose = require('mongoose');


requestRouter.post("/request/send/:status/:toUserId", userAuth, async(req, res)=> {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;
 
      // FIRST, validate the ID format
      if (!mongoose.Types.ObjectId.isValid(toUserId)) {
         return res.status(400).json({
             message: "Invalid user ID format"
         });
      }
 
      // Validate status
      const validStatuses = ["interested", "ignored"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          message: "Invalid status. Only 'interested' or 'ignored' are allowed."
        });
      }
 
      //validate user
      const toUser = await User.findById(toUserId);
      if(!toUser) {
         return res.status(404).json({
             message: "user not found"
         });
      }
 
      // Prevent sending request to self
      if (fromUserId.toString() === toUserId) {
         return res.status(400).json({
           message: "You cannot send a request to yourself"
         });
       }
  
      //check if there is an existing request
      const existingRequest = await ConnectionRequest.findOne({
         fromUserId,
         toUserId,
         status: { $in: ["interested", "ignored"] }
      });
 
      if (existingRequest) {
         return res.status(400).json({
           message: "A connection request already exists for this user",
           existingRequest
         });
      }
 
      const connectionRequest = new ConnectionRequest({
         fromUserId,
         toUserId,
         status,
      });
 
      const data = await connectionRequest.save();
     
      res.json({
         message: 
          req.user.firstName + " is " + status + " in " + toUser.firstName,
         data,
      })
 
    } catch (err) {
     console.error(err);
     res.status(500).json({ 
         message: "the request was not succesfull",
         error: err.message 
     });
   }
 });


requestRouter.post("/request/review/:status/:requestId", userAuth, async(req, res)=> {
  
      try {
        const loggedInUser = req.user;
        const {status, requestId} = req.params


        const allowedStatus = ["accepted", "rejected"];
        if(!allowedStatus.includes(status)) {
          return res.status(400).json({
            message: "Invalid status. Only 'accepted' or 'rejected' are allowed."
         })
        };

        const connectionRequest = await ConnectionRequest.findOne({
          _id: requestId,
          toUserId: loggedInUser._id,
          status: "interested",
        });


        if(!connectionRequest){
          return res.status(400).json({
            message: "Connection request is not found"
         });
        };

        connectionRequest.status = status;
                    
        const data = await connectionRequest.save();

        res.json({ message: "connection request " + status, data})




        
      } catch (err) {
        console.error(err);
        res.status(500).json({ 
            message: "the request was not succesfull",
            error: err.message 
        });
      }
 });


module.exports = requestRouter;