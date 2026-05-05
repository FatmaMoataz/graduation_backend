import mongoose from "mongoose";

export const invitationStatusEnum = {'pending':'pending','accepted':'accepted','rejected':'rejected'};

const invitationSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
        enum: Object.values(invitationStatusEnum),
        default: invitationStatusEnum.pending
    },
    token: {
        type: String,
        required: true,
        unique: true,
    },
    emailInvited: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    expiresAt: {
        type: Date,
        default: () => Date.now() + 24 * 60 * 60 * 1000
}
    
},{
    timestamps:true,
    toObject:{virtuals:true},
    toJSON:{virtuals:true}
});

const Invitation = mongoose.model('Invitation', invitationSchema);

export default Invitation;