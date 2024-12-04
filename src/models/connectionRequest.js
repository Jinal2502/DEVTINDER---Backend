const mongoose = require('mongoose');
const { applyTimestamps } = require('./user');

const connectionRequestSchema = mongoose.Schema({

    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    toUserId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: `{VALUE} IS INCORRECT STATUS TYPE
            `

        },
        
    },

}, 
{
   timestamps: true, 
});

connectionRequestSchema.index({fromUserId:1, toUserId:1});

module.exports = mongoose.model("connectionRequest", connectionRequestSchema);