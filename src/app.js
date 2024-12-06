const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require('cookie-parser');
const cors = require("cors");



app.use(express.json());
app.use(cookieParser());
app.use(cors)

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user")


app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter)






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







