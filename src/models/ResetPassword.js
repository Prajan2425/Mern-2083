import mongoose, { Mongoose } from "mongoose";

const resetPasswordSchema = new mongoose.Schema({

    userId:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "User Id is Required."] 

    },
    token:{
        type: String,
        required: [true, "Reset Password Token is Required."]
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        immutable: true,
    },
    expiresAt:{
        type: Date,
        default: Date.now() + 3600000, // 1 hour in miliseconds
        immutable: true,
    },
    isUsed:{
        type: Boolean,
        default: false,
    },
});

export default mongoose.model("ResetPassword", resetPasswordSchema);