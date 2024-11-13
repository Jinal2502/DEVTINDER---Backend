const express = require("express");
const connectDB = require("./config/database")
const app = express();
const User = require('./models/user')

app.post("/signup", async (req,res) => {
    //write the logic to add the data to the database

    const user = new User({
        firstName: "Jinal",
        lastName: "Rathva",
        emailId: "jilu.jr11@gmail.com",
        password: "123456",
        age:  4,
        gender: "male"
    });

   await user.save();
   res.send("MISSION DATA SUCCESSFULL")
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







