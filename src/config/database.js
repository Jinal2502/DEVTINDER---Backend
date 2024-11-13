const mongoose = require("mongoose");

const connectDB = async () => {
    mongoose.connect(
        "mongodb+srv://Jinal25:JuInh1KHfNrxMPiA@cluster0.z2oej.mongodb.net/devTinder"
    );
};

module.exports = connectDB
