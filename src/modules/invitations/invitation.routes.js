import { Router } from "express";
import * as invitationController from "./invitation.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { createInvitationSchema, updateInvitationSchema, tokenParamSchema , idParamSchema} from "../../validators/invitation.validation.js";

const router = Router();

router.post(
  "/",
  authenticate,
  validate(createInvitationSchema),
  invitationController.createInvitation
);

router.post(
  "/accept/:token",
  validate(tokenParamSchema, "params"),
  invitationController.handleInvitationResponse
);

router.post(
  "/reject/:token",
  validate(tokenParamSchema, "params"),
  invitationController.handleInvitationResponse
);

router.get(
  "/",
  authenticate,
  invitationController.getAllInvitations
);

router.get(
  "/token/:token",
  validate(tokenParamSchema, "params"),
  invitationController.getInvitationByToken
);

router.get(
  "/:id",
  authenticate,
  validate(idParamSchema, "params"),
  invitationController.getInvitationById
);

router.put(
  "/:id",
  authenticate,
  validate(idParamSchema, "params"),
  validate(updateInvitationSchema),
  invitationController.updateInvitation
);

router.delete(
  "/:id",
  authenticate,
  validate(idParamSchema, "params"),
  invitationController.deleteInvitation
);

export default router;