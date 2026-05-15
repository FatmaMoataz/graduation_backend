import Joi from "joi";

// helper for ObjectId validation
const objectId = Joi.string()
  .hex()
  .length(24);

// create poll
export const createPollSchema = Joi.object({
  question: Joi.string().min(3).max(200).required(),

  communityId: objectId.optional(),
  postId: objectId.optional(),

  options: Joi.array()
    .items(
      Joi.object({
        text: Joi.string().required(),
      })
    )
    .min(2)
    .required(),
});

// vote poll
export const votePollSchema = Joi.object({
  pollId: objectId.required(),
  optionText: Joi.string().required(),
});