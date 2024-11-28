const express = require("express");
const connectDB = require("./config/database")
const app = express();
const User = require('./models/user')



app.use(express.json());
//send the data
app.post("/signup", async (req,res) => {
    //write the logic to add the data to the database
    
    const user = new User(req.body);

    
    try {
        await user.save();
   res.send("MISSION DATA SUCCESSFULL")
    } catch (err) {
        res.status(400).send("error saving the user" + err.message);
    }
   
});
//get the data
app.get("/user", async (req,res)=> {
    const userEmail = req.body.emailId
    try {
        const user = await User.findOne({emailId: userEmail});
        if(user.length === 0 ) {
            res.status(404).send("sorry mate was not able to find your guy my bad")
        }
        else{
            res.send(user);
        }
    

    } catch (err) {
        res.status(400).send("something went wrong")
    }
    

});

//feed API - GET/FEED - GET ALL THE USERS FROM THE DATABASE
app.get("/feed", async (req,res)=> {
    try {
        const users = await User.find({});
        res.send(users)

    } catch (err) {
        res.status(400).send("something went wrong");
    }
});
//delete the data
app.delete("/user", async (req, res)=> {
    const userId = req.body.userId
    try {
        const user = await User.findByIdAndDelete(userId);

        res.send("user deleted from the database")
        
    } catch (err) {
        res.status(400).send("something went wrong");
    }
});
//update the data
app.patch("/user/:userId", async(req, res)=> {
    const userId = req.params?.userId;
    const data = req.body;

    const ALLOWED_UPDATES = [
       "userId", "photoUrl", "about", "gender", "age", "skills"
    ]
    const isUpdateAllowed = Object.keys(data).every((k)=>
        ALLOWED_UPDATES.includes(k)
    );
    if(!isUpdateAllowed) {
       res.status(400).send("update is restricted")
    }
    try {
        const ALLOWED_UPDATES = [
            "userId", "photoUrl", "about", "gender", "age", "skills"
         ]
         const isUpdateAllowed = Object.keys(data).every((k)=>
             ALLOWED_UPDATES.includes(k)
         );
         if(!isUpdateAllowed) {
            throw new Error("update is restricted");
         }





      await User.findByIdAndUpdate({_id: userId}, data,{
        returnDocument: "after",
        runValidators: true,
      });  
      res.send("user has been updated succesfully")
        
    } catch (err) {
        res.status(400).send("UPDATE FAILED:" + err.message);
    }
});












connectDB()
   .then(() => {
    console.log("database connection is successfull")
    app.listen(3000, () => {
        console.log("buzz lightyear speaking on server")
    });
    })
   .catch(err => {
    console.error("database connection is failed")
    })







