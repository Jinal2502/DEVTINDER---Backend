const express = require("express");

const app = express();


app.use( "/test",(req, res) => {
    res.send("hello from the server side")
});
app.use( "/hello",(req, res) => {
    res.send("hello ")
});


app.listen(3000, () => {
    console.log("chalu hogaya bc")
});