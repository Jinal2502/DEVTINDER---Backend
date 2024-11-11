const express = require("express");

const app = express();

app.get("/user", (req, res) => {
    // res.send("hey you want to get me? nobody gets me i am the buzz lightyear")
    res.send({name: "jinal", lastname: "rathva"})
});

app.post("/user", (req, res) => {
    console.log("save data to the database");
    res.send("data successfully saved to the database");
});

app.delete("/user", (req, res) => {
    console.log("get lost");
    res.send("data successfully deleted from the database");
});



app.use( "/test",(req, res) => {
    res.send("hello from the server side - andy is speaking")
});
app.u



app.listen(3000, () => {
    console.log("buzz lightyear speaking on server")
});