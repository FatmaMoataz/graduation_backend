import { Router } from "express";
import * as notificationController from "./notification.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validation.middleware.js";

import {
  createNotificationSchema,
  markAsReadSchema,
} from "../../validators/notification.validation.js";

const router = Router();

// CREATE NOTIFICATION
router.post(
  "/",
  authenticate,
  validate(createNotificationSchema),
  notificationController.createNotification
);

// GET USER NOTIFICATIONS
router.get(
  "/user/:userId",
  authenticate,
  notificationController.getUserNotifications
);

// MARK AS READ
router.patch(
  "/read/:id",
  authenticate,
  validate(markAsReadSchema, "params"),
  notificationController.markAsRead
);

// DELETE
router.delete(
  "/:id",
  authenticate,
  notificationController.deleteNotification
);

export default router;