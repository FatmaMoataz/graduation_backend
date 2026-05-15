import Notification from "../../db/models/notification.model.js";

// CREATE NOTIFICATION
export const createNotificationService = async (data) => {
  const notification = await Notification.create(data);

  await notification.populate("userId fromUserId");

  return {
    success: true,
    message: "Notification created successfully",
    data: notification,
  };
};

// GET USER NOTIFICATIONS
export const getUserNotificationsService = async (userId) => {
  const notifications = await Notification.find({ userId })
    .sort({ createdAt: -1 })
    .populate("userId", "username email")
    .populate("fromUserId", "username email");

  return {
    success: true,
    results: notifications.length,
    data: notifications,
  };
};

// MARK AS READ
export const markAsReadService = async (id, userId) => {
  const notification = await Notification.findById(id);

  if (!notification) {
    return {
      success: false,
      status: 404,
      message: "Notification not found",
    };
  }

  if (notification.userId.toString() !== userId.toString()) {
    return {
      success: false,
      status: 403,
      message: "Unauthorized to mark this notification as read",
    };
  }

  notification.is_read = true;
  notification.read_at = new Date();

  await notification.save();

  return {
    success: true,
    message: "Notification marked as read",
    data: notification,
  };
};

// DELETE NOTIFICATION
export const deleteNotificationService = async (id, userId) => {
  const notification = await Notification.findById(id);

  if (!notification) {
    return {
      success: false,
      status: 404,
      message: "Notification not found",
    };
  }

  if (notification.userId.toString() !== userId.toString()) {
    return {
      success: false,
      status: 403,
      message: "Unauthorized to delete this notification",
    };
  }

  await Notification.findByIdAndDelete(id);

  return {
    success: true,
    message: "Notification deleted successfully",
  };
};