import Joi from "joi";

// reusable ObjectId validation
const objectId = Joi.string().hex().length(24);

export const updateUserSchema = Joi.object({
  username: Joi.string().min(3).max(50),
  email: Joi.string().email(),
  role: Joi.string().valid("admin", "user")
}).min(1);

export const idParamSchema = Joi.object({
  id: objectId.required()
});
