import { Router } from "express";

import * as postController from "./post.controller.js";

import { authenticate } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validation.middleware.js";

import {
  createPostSchema,
  updatePostSchema,
  idParamSchema,
  commentSchema
} from "../../validators/post.validation.js";

const router = Router();

router.post(
  "/",
  authenticate,
  validate(createPostSchema),
  postController.createPost
);

router.get(
  "/",
  postController.getAllPosts
);

router.get(
  "/:id",
  validate(idParamSchema, "params"),
  postController.getPostById
);

router.put(
  "/:id",
  authenticate,
  validate(idParamSchema, "params"),
  validate(updatePostSchema),
  postController.updatePost
);

router.delete(
  "/:id",
  authenticate,
  validate(idParamSchema, "params"),
  postController.deletePost
);

router.post(
  "/:id/like",
  authenticate,
  validate(idParamSchema, "params"),
  postController.likePost
);

router.delete(
  "/:id/like",
  authenticate,
  validate(idParamSchema, "params"),
  postController.unlikePost
);

router.post(
  "/:id/comment",
  authenticate,
  validate(idParamSchema, "params"),
  validate(commentSchema),
  postController.addComment
);

export default router;