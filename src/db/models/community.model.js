import mongoose from "mongoose";

const communitySchema = new mongoose.Schema({

},{
    timestamps:true,
    toObject:{virtuals:true},
    toJSON:{virtuals:true}
});

const Community = mongoose.model('Community',communitySchema);

export default Community;