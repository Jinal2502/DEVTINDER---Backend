const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        lowercase:true,
        index: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        min: 18,
        
    },
    gender: {
        type: String,
        validate(value) {
            if([!"male", "female", "others"].includes(value)) {
                throw new Error("who the hell are you?")
            }
        }
        
    
    },
    photoUrl: {
        type: String,
        default: "https://i.insider.com/66d9b2d95444ffafa76263d4?width=800&format=jpeg&auto=webp"
    },
    about: {
        type: String,
        default: "this is just a default value"
    },
    skills: {
        type:[String],
    }
}, {
    timestamps: true,
});



module.exports = mongoose.model("User", userSchema);