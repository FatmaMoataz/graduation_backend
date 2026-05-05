import { Router } from "express";
import * as communityController from "./community.controller.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import {
  createCommunitySchema,
  updateCommunitySchema,
  idParamSchema
} from "../../validators/community.validation.js";

const router = Router();

// Create
router.post(
  "/",
  authenticate,
  validate(createCommunitySchema),
  communityController.createCommunity
);

// Get All
router.get("/", communityController.getAllCommunities);

// Get One
router.get(
  "/:id",
  validate(idParamSchema, "params"),
  communityController.getCommunity
);

// Update
router.put(
  "/:id",
  authenticate,
  validate(idParamSchema, "params"),
  validate(updateCommunitySchema),
  communityController.updateCommunity
);

// Delete
router.delete(
  "/:id",
  authenticate,
  validate(idParamSchema, "params"),
  communityController.deleteCommunity
);

export default router;