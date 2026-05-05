import mongoose from "mongoose";

export const roleEnum = {'admin':'admin','user':'user'};

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minLength:[3,'Username must be at least 3 characters long'],
        maxLength:[50,'Username cannot exceed 50 characters'],
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        enum:roleEnum,
        default:roleEnum.user,
    }
},{timestamps:true,
    toObject:{virtuals:true},
    toJSON:{virtuals:true}
});

const User = mongoose.model('User',userSchema);

export default User;