const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

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
        validate(value) {
          if(!validator.isEmail(value)) {
            throw new Error("invalid email adress")
          }
        }
        
    },

    password: {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isStrongPassword(value)) {
              throw new Error("your password is very weak")
            }
          }
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
        default: "https://i.insider.com/66d9b2d95444ffafa76263d4?width=800&format=jpeg&auto=webp",
        validate(value) {
            if(!validator.isURL(value)) {
              throw new Error("invalid PHOTO URL")
            }
          }
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

userSchema.methods.getJWT =  async function () {
    const user = this;
    const token = await jwt.sign({_id : user._id },"DEV@TINDER$25022006",
    { expiresIn: "1d"

     });

     return token;
};

userSchema.methods.validatePassword = async function(passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid =  await bcrypt.compare(
        passwordInputByUser,
        passwordHash

    );
    return isPasswordValid
};   

    
   


module.exports = mongoose.model("User", userSchema);