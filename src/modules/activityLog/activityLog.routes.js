import { Router } from "express";
import * as activityController from "./activityLog.controller.js";
import { validate } from "../../middlewares/validation.middleware.js";
import {
  createActivityValidation,
} from "../../validators/activityLog.validation.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/",
  authenticate,
  validate(createActivityValidation),
  activityController.createActivity
);

router.get(
  "/",
  authenticate,
  activityController.getAllActivities
);

router.get(
  "/:id",
  authenticate,
  activityController.getSingleActivity
);

router.delete(
  "/:id",
  authenticate,
  activityController.deleteActivity
);

export default router;