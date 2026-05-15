import * as notificationService from "./notification.service.js";

// CREATE
export const createNotification = async (req, res, next) => {
  try {
    const result = await notificationService.createNotificationService({
      ...req.body,
      fromUserId: req.userId
    });

    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

// GET USER NOTIFICATIONS
export const getUserNotifications = async (req, res, next) => {
  try {
    // Only allow users to view their own notifications
    if (req.params.userId !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to view these notifications"
      });
    }

    const result = await notificationService.getUserNotificationsService(
      req.params.userId
    );

    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// MARK AS READ
export const markAsRead = async (req, res, next) => {
  try {
    const result = await notificationService.markAsReadService(
      req.params.id,
      req.userId
    );

    if (!result.success) {
      return res.status(result.status || 404).json(result);
    }

    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// DELETE
export const deleteNotification = async (req, res, next) => {
  try {
    const result = await notificationService.deleteNotificationService(
      req.params.id,
      req.userId
    );

    if (!result.success) {
      return res.status(result.status || 404).json(result);
    }

    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};