import mongoose from "mongoose";

const post = new mongoose.Schema({
    content:{
        type:String,
        required:true,
        minLength:[1,'Post content must be at least 1 character long'],
        maxLength:[300,'Post content cannot exceed 300 characters'],
    },
    is_pinned:{
        type:Boolean,
        default:false,
    }
},{
    timestamps:true,
    toObject:{virtuals:true},
    toJSON:{virtuals:true}
});

const Post = mongoose.model('Post',post);

export default Post;