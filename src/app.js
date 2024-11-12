const express = require("express");

const app = express();
const {adminAuth} = require("./middlewares/auth")
//handle auth middleware for all requests we can also use .all
app.use("/admin", adminAuth );

app.get("/admin/getAllData", (req, res) => {
   res.send("all the data is delivered")
});
app.get("/admin/deleteUser", (req, res) => {
    res.send("we have deleted that guy")
 });



app.listen(3000, () => {
    console.log("buzz lightyear speaking on server")
});