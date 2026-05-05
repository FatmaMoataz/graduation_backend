import mongoose from "mongoose";
import "./post.model.js";

const communitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    trim: true
  },
  feeds: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});

const Community = mongoose.model("Community", communitySchema);

export default Community;