import Joi from "joi";

export const createCompanySchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  industry: Joi.string().min(2).max(50).required(),
  subscriptionPlan: Joi.string().valid("free", "basic", "premium").default("free")
});

export const updateCompanySchema = Joi.object({
  name: Joi.string().min(2).max(50),
  industry: Joi.string().min(2).max(50),
  subscriptionPlan: Joi.string().valid("free", "basic", "premium")
}).min(1);

export const idParamSchema = Joi.object({
  id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
});