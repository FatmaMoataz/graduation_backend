import { Router } from "express";
import * as authController from "./auth.controller.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
  changePasswordSchema
} from "../../validators/auth.validation.js";

const router = Router();

// Register
router.post(
  "/register",
  validate(registerSchema),
  authController.register
);

// Login
router.post(
  "/login",
  validate(loginSchema),
  authController.login
);

// Refresh Token
router.post(
  "/refresh",
  validate(refreshTokenSchema),
  authController.refreshToken
);

// Logout
router.post("/logout", authenticate, authController.logout);

// Change Password
router.post(
  "/change-password",
  authenticate,
  validate(changePasswordSchema),
  authController.changePassword
);

export default router;
