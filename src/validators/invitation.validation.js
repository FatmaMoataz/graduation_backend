import Joi from "joi";

export const idParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required()
});

export const tokenParamSchema = Joi.object({
  token: Joi.string().required()
});

export const createInvitationSchema = Joi.object({
  emailInvited: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "invalid email format",
      "any.required": "email is required"
    })
});

export const updateInvitationSchema = Joi.object({
  emailInvited: Joi.string().email()
}).min(1);
