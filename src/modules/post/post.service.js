import Post from "../../db/models/post.model.js";
import Comment from "../../db/models/comment.model.js";

export const createPostService = async (data) => {
  const post = await Post.create(data);

  await post.populate("communityId userId pollId");

  return {
    success: true,
    message: "Post created successfully",
    data: post
  };
};

export const getAllPostsService = async () => {
  const posts = await Post.find()
    .populate("communityId")
    .populate("userId", "username email")
    .populate("pollId")
    .populate({
      path: "comments",
      populate: {
        path: "userId",
        select: "username email"
      }
    });

  return {
    success: true,
    results: posts.length,
    data: posts
  };
};

export const getPostByIdService = async (id) => {
  const post = await Post.findById(id)
    .populate("communityId")
    .populate("userId", "username email")
    .populate("pollId")
    .populate({
      path: "comments",
      populate: {
        path: "userId",
        select: "username email"
      }
    });

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

export const updatePostService = async (id, data, userId) => {
  const post = await Post.findById(id);

  if (!post) {
    return {
      success: false,
      message: "Post not found"
    };
  }

  if (post.userId.toString() !== userId.toString()) {
    return {
      success: false,
      message: "Unauthorized"
    };
  }

  const updatedPost = await Post.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  })
    .populate("communityId")
    .populate("userId")
    .populate("pollId");

  return {
    success: true,
    message: "Post updated successfully",
    data: updatedPost
  };
};

export const deletePostService = async (id, userId) => {
  const post = await Post.findById(id);

  if (!post) {
    return {
      success: false,
      message: "Post not found"
    };
  }

  if (post.userId.toString() !== userId.toString()) {
    return {
      success: false,
      message: "Unauthorized"
    };
  }

  await Post.findByIdAndDelete(id);

  return {
    success: true,
    message: "Post deleted successfully"
  };
};

export const likePostService = async (postId, userId) => {
  const post = await Post.findById(postId);

  if (!post) {
    return {
      success: false,
      message: "Post not found"
    };
  }

  const alreadyLiked = post.likes.some(
    (id) => id.toString() === userId.toString()
  );

  if (alreadyLiked) {
    return {
      success: false,
      message: "Post already liked"
    };
  }

  await Post.findByIdAndUpdate(postId, {
    $addToSet: { likes: userId }
  });

  return {
    success: true,
    message: "Post liked successfully"
  };
};

export const unlikePostService = async (postId, userId) => {
  const post = await Post.findById(postId);

  if (!post) {
    return {
      success: false,
      message: "Post not found"
    };
  }

  await Post.findByIdAndUpdate(postId, {
    $pull: { likes: userId }
  });

  return {
    success: true,
    message: "Post unliked successfully"
  };
};

export const addCommentService = async (
  postId,
  userId,
  content
) => {
  const post = await Post.findById(postId);

  if (!post) {
    return {
      success: false,
      message: "Post not found"
    };
  }

  const comment = await Comment.create({
    content,
    userId,
    postId
  });

  await Post.findByIdAndUpdate(postId, {
    $push: { comments: comment._id }
  });

  return {
    success: true,
    message: "Comment added successfully",
    data: comment
  };
};