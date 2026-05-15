import mongoose from "mongoose";

export const activityLogEntityTypeEnum = {
  Task: "Task",
  Post: "Post",
  Comment: "Comment",
  Poll: "Poll",
  User: "User",
  Company: "Company",
};

export const activityActionEnum = {
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  LIKE: "LIKE",
  COMMENT: "COMMENT",
  JOIN: "JOIN",
  ASSIGN: "ASSIGN",      // For task assignments
  COMPLETE: "COMPLETE",  // For task completion
  ARCHIVE: "ARCHIVE",    // For archiving items
  MENTION: "MENTION",    // For @mentions
};

const activityLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      enum: Object.values(activityActionEnum),
    },

    message: {
      type: String,
      trim: true,
    },

    entity_type: {
      type: String,
      required: true,
      enum: Object.values(activityLogEntityTypeEnum),
    },

    entity_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "entity_type",
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const ActivityLog =
  mongoose.models.ActivityLog ||
  mongoose.model("ActivityLog", activityLogSchema);

export default ActivityLog;