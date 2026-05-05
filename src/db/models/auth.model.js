import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    refreshToken: {
        type: String,
        required: false
    },
    loginAttempts: {
        type: Number,
        default: 0
    },
    lockUntil: {
        type: Date,
        required: false
    },
    lastLogin: {
        type: Date,
        required: false
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {timestamps: true});

const Auth = mongoose.model('Auth', authSchema);

export default Auth;
