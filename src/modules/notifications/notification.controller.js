import * as notificationService from "./notification.service.js";

// CREATE
export const createNotification = async (req, res, next) => {
  try {
    const result = await notificationService.createNotificationService(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

// GET USER NOTIFICATIONS
export const getUserNotifications = async (req, res, next) => {
  try {
    const result = await notificationService.getUserNotificationsService(
      req.params.userId
    );

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// MARK AS READ
export const markAsRead = async (req, res, next) => {
  try {
    const result = await notificationService.markAsReadService(req.params.id);

    if (!result.success) {
      return res.status(404).json(result);
    }

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// DELETE
export const deleteNotification = async (req, res, next) => {
  try {
    const result = await notificationService.deleteNotificationService(
      req.params.id
    );

    if (!result.success) {
      return res.status(404).json(result);
    }

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};