import Joi from "joi";

export const createPostSchema = Joi.object({
  content: Joi.string().min(1).max(300).required(),

  is_pinned: Joi.boolean(),

  communityId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required(),

  pollId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .optional()
});

export const updatePostSchema = Joi.object({
  content: Joi.string().min(1).max(300),

  is_pinned: Joi.boolean(),

  communityId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),

  pollId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/)
}).min(1);

export const idParamSchema = Joi.object({
  id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
});

export const commentSchema = Joi.object({
  content: Joi.string().min(1).max(200).required()
});