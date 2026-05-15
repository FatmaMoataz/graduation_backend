import ActivityLog from "../../db/models/activityLog.model.js";
import User from "../../db/models/user.model.js";

export const createActivityService = async (data) => {
  const activity = await ActivityLog.create(data);

  return {
    success: true,
    message: "Activity created successfully",
    data: activity,
  };
};

export const getAllActivitiesService = async () => {
  const activities = await ActivityLog.find()
    .populate("userId", "username email").populate("entity_id")
    .sort({ createdAt: -1 });

  return {
    success: true,
    results: activities.length,
    data: activities,
  };
};

export const getSingleActivityService = async (id) => {
  try {
    const activity = await ActivityLog.findById(id)
      .populate("userId", "username email");

    if (!activity) {
      throw new Error("Activity not found");
    }

    return {
      success: true,
      data: activity,
    };
  } catch (error) {
    if (error.name === 'CastError') {
      throw new Error("Invalid activity ID format");
    }
    throw error;
  }
};

export const deleteActivityService = async (id , userId) => {
  const activity = await ActivityLog.findById(id);
  
  if (!activity) {
    throw new Error("Activity not found");
  }
  
  // Only allow admins or the activity owner to delete
  const user = await User.findById(userId);
  if (user.role !== 'admin' && activity.userId.toString() !== userId) {
    throw new Error("Unauthorized to delete this activity");
  }
  
  await ActivityLog.findByIdAndDelete(id);

  return {
    success: true,
    message: "Activity deleted successfully",
  };
};