const express = require("express");
const connectDB = require("./config/database")
const app = express();
const User = require('./models/user')



app.use(express.json());
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







