import Joi from "joi";
import { generalFields } from "../../middlewares/validation.middleware.js";

export const createProjectSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  description: Joi.string().min(10).max(500).required(),
  status: Joi.string().valid("not started", "in progress", "completed"),
  ended_at: Joi.date(),
  projectMember: generalFields.id,
  userId: generalFields.id,
  reportId: generalFields.id,
  epicId: generalFields.id,
  kanbanBoardId: generalFields.id,
  companyId: generalFields.id,
  meetingId: generalFields.id
});

export const updateProjectSchema = Joi.object({
  name: Joi.string().min(2).max(50),
  description: Joi.string().min(10).max(500),
  status: Joi.string().valid("not started", "in progress", "completed"),
  ended_at: Joi.date(),
  archived: Joi.boolean()
});

export const idParamSchema = Joi.object({
  id: generalFields.id.required()
});