const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth")
const {validateEditProfileData} = require("../utils/validation");
const bcrypt = require("bcrypt");


profileRouter.get("/profile/view", userAuth ,async(req,res)=>{

    try {
       const user = req.user;
       res.send(user);
 
    } 
    catch (err) {
        res.status(400).send("ERROR" + err.message);
    }

    
});

profileRouter.patch("/profile/edit", userAuth, async(req,res)=>{
 
    try {
        
       if (!validateEditProfileData(req)) {
            // return res.status(400).send("")
            throw new Error("invalid edit request")
       }

    const loggedInUser = req.user;
   
    //    loggedInUser.firstName = req.body.firstName;
    Object.keys(req.body).forEach((key) => (loggedInUser[key]= req.body[key]));
    await loggedInUser.save();
    console.log(loggedInUser);
    res.json({
        message: `${loggedInUser.firstName}, your profile is updated successfully`,
        data : loggedInUser,
    });

    } catch (err) {
        res.status(400).send("ERROR:" + err.message)
        
    }

});

profileRouter.patch("/profile/changePassword", userAuth, async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmNewPassword } = req.body;
        const user = req.user;

        // Validate input
        if (!currentPassword || !newPassword || !confirmNewPassword) {
            return res.status(400).json({ 
                message: "All password fields are required" 
            });
        }

        // Check if new passwords match
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ 
                message: "New passwords do not match" 
            });
        }

        // Validate current password
        const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ 
                message: "Current password is incorrect" 
            });
        }

        // Validate new password strength (optional, but recommended)
        if (newPassword.length < 8) {
            return res.status(400).json({ 
                message: "New password must be at least 8 characters long" 
            });
        }

        // Hash new password
        const saltRounds = 10;
        const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

        // Update user's password
        user.password = hashedNewPassword;
        await user.save();

        res.json({
            message: "Password changed successfully"
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            message: "Error changing password", 
            error: err.message 
        });
    }
});



module.exports = profileRouter;