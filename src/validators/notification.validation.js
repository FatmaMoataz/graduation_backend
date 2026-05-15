import Joi from "joi";

const objectId = Joi.string().hex().length(24);

export const createNotificationSchema = Joi.object({
  title: Joi.string().min(3).max(50).required(),

  message: Joi.string().min(10).max(200).required(),

  type: Joi.string()
    .valid(
      "SYSTEM",
      "TASK_ASSIGNED",
      "TASK_UPDATED",
      "COMMENT",
      "LIKE",
      "MENTION",
      "POLLS"
    )
    .required(),

  userId: objectId.required(),

  referenceId: objectId.optional(),

  referenceModel: Joi.string().valid("Task", "Post", "Poll").optional(),
});

export const markAsReadSchema = Joi.object({
  id: objectId.required(),
});