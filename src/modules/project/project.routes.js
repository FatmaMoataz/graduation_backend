import { Router } from "express";
import * as projectController from "./project.controller.js";
import { validate } from "../../middlewares/validation.middleware.js";
import {
  createProjectSchema,
  updateProjectSchema,
  idParamSchema
} from "./project.validation.js";

const router = Router();

// Create
router.post(
  "/",
  validate(createProjectSchema),
  projectController.createProject
);

// Get All
router.get("/", projectController.getAllProjects);

// Get One
router.get(
  "/:id",
  validate(idParamSchema, "params"),
  projectController.getProject
);

// Update
router.put(
  "/:id",
  validate(idParamSchema, "params"),
  validate(updateProjectSchema),
  projectController.updateProject
);

// Delete
router.delete(
  "/:id",
  validate(idParamSchema, "params"),
  projectController.deleteProject
);

export default router;