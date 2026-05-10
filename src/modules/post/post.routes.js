import { Router } from "express";

import * as postController from "./post.controller.js";

import { validate } from "../../middlewares/validation.middleware.js";

import {
  createPostSchema,
  updatePostSchema,
  idParamSchema
} from "../../validators/post.validation.js";

const router = Router();

router.post(
  "/",
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
  validate(idParamSchema, "params"),
  validate(updatePostSchema),
  postController.updatePost
);

router.delete(
  "/:id",
  validate(idParamSchema, "params"),
  postController.deletePost
);

export default router;