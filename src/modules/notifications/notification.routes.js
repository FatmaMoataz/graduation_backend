import { Router } from "express";
import * as notificationController from "./notification.controller.js";

import { validate } from "../../middlewares/validation.middleware.js";

import {
  createNotificationSchema,
  markAsReadSchema,
} from "../../validators/notification.validation.js";

const router = Router();

// CREATE NOTIFICATION
router.post(
  "/",
  validate(createNotificationSchema),
  notificationController.createNotification
);

// GET USER NOTIFICATIONS
router.get(
  "/user/:userId",
  notificationController.getUserNotifications
);

// MARK AS READ
router.patch(
  "/read/:id",
  validate(markAsReadSchema, "params"),
  notificationController.markAsRead
);

// DELETE
router.delete(
  "/:id",
  notificationController.deleteNotification
);

export default router;