import * as postService from "./post.service.js";

export const createPost = async (req, res, next) => {
  try {
    const result = await postService.createPostService({
      ...req.body,
      userId: req.user._id
    });

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getAllPosts = async (req, res, next) => {
  try {
    const result = await postService.getAllPostsService();

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getPostById = async (req, res, next) => {
  try {
    const result = await postService.getPostByIdService(
      req.params.id
    );

    if (!result.success) {
      return res.status(404).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const result = await postService.updatePostService(
      req.params.id,
      req.body,
      req.user._id
    );

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const result = await postService.deletePostService(
      req.params.id,
      req.user._id
    );

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const likePost = async (req, res, next) => {
  try {
    const result = await postService.likePostService(
      req.params.id,
      req.user._id
    );

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const unlikePost = async (req, res, next) => {
  try {
    const result = await postService.unlikePostService(
      req.params.id,
      req.user._id
    );

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const addComment = async (req, res, next) => {
  try {
    const result = await postService.addCommentService(
      req.params.id,
      req.user._id,
      req.body.content
    );

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};