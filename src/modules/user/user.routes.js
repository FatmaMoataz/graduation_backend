import { Router } from "express";
import * as userController from "./user.controller.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import {
  updateUserSchema,
  idParamSchema
} from "../../validators/user.validation.js";

const router = Router();

// Get All Users
router.get("/", userController.getAllUsers);

// Get Current User
router.get("/current", authenticate, userController.getCurrentUser);

// Get User By ID
router.get(
  "/:id",
  validate(idParamSchema, "params"),
  userController.getUserById
);

// Update User
router.put(
  "/:id",
  authenticate,
  validate(idParamSchema, "params"),
  validate(updateUserSchema),
  userController.updateUser
);

// Delete User
router.delete(
  "/:id",
  authenticate,
  validate(idParamSchema, "params"),
  userController.deleteUser
);

export default router;
