const validator = require('validator');

const validateSignUpData = (req) => {
    const {firstName, lastName, emailId, password} = req.body;
    if(!firstName || !lastName) {
        throw new Error("PLEASE ENTER YOUR NAME");
    }
    else if (firstName.length <4 || firstName.length>50) {
        throw new Error("Your name is way to big kiddo");
    }
    else if (!validator.isEmail(emailId)) {
        throw new Error("Email is not valid");
    }

    else if (!validator.isStrongPassword(password)) {
        throw new Error("your password is weak try to some diff combination");
    }

};

const validateEditProfileData = (req) => {
    const allowedEditFields = ["firstName", "lastName", "photoUrl", "gender", "age", "about", "skills"]

    const isEditAllowed = Object.keys(req.body).every(field => allowedEditFields.includes(field));


    return isEditAllowed;
};



module.exports = {
    validateSignUpData,
    validateEditProfileData,

}