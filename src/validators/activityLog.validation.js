import Joi from "joi";
import mongoose from "mongoose";

const objectId = (value, helper) => {
  return mongoose.Types.ObjectId.isValid(value)
    ? value
    : helper.message("Invalid ObjectId");
};

export const createActivityValidation = Joi.object({
  action: Joi.string()
    .valid(
      "CREATE",
      "UPDATE",
      "DELETE",
      "LIKE",
      "COMMENT",
      "JOIN",
        "ASSIGN",
        "COMPLETE",
        "ARCHIVE",
        "MENTION"
    )
    .required(),

  message: Joi.string().trim().optional(),

  entity_type: Joi.string()
    .valid("Task", "Post", "Comment", "Poll", "User", "Company")
    .required(),

  entity_id: Joi.string().custom(objectId).required(),
});

export const createActivityParamsValidation = Joi.object({
  entityType: Joi.string()
    .valid("Task", "Post", "Comment", "Poll", "User", "Company")
    .required(),
  entityId: Joi.string().custom(objectId).required(),
});