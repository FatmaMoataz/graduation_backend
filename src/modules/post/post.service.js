import Post from "../../db/models/post.model.js";

export const createPostService = async (data) => {
  const post = await Post.create(data);

  return {
    success: true,
    message: "Post created successfully",
    data: post
  };
};

export const getAllPostsService = async () => {
  const posts = await Post.find()
    .populate("communityId")
    .populate("userId")
    .populate("pollId");

  return {
    success: true,
    results: posts.length,
    data: posts
  };
};

export const getPostByIdService = async (id) => {
  const post = await Post.findById(id)
    .populate("communityId")
    .populate("userId")
    .populate("pollId");

  if (!post) {
    return {
      success: false,
      message: "Post not found"
    };
  }

  return {
    success: true,
    data: post
  };
};

export const updatePostService = async (id, data) => {
  const post = await Post.findByIdAndUpdate(id, data, {
    new: true
  });

  if (!post) {
    return {
      success: false,
      message: "Post not found"
    };
  }

  return {
    success: true,
    message: "Post updated successfully",
    data: post
  };
};

export const deletePostService = async (id) => {
  const post = await Post.findByIdAndDelete(id);

  if (!post) {
    return {
      success: false,
      message: "Post not found"
    };
  }

  return {
    success: true,
    message: "Post deleted successfully"
  };
};