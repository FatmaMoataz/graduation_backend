import Joi from "joi";

// reusable ObjectId validation
const objectId = Joi.string().hex().length(24);

export const createCommunitySchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  feeds: Joi.object(),
  userId: objectId,
  members: Joi.array().items(objectId),
  posts: Joi.array().items(objectId)
});

export const updateCommunitySchema = Joi.object({
  name: Joi.string().min(2).max(50),
  feeds: Joi.object(),
  members: Joi.array().items(objectId),
  posts: Joi.array().items(objectId)
});

export const idParamSchema = Joi.object({
  id: objectId.required()
});