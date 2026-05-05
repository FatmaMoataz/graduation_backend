import { Router } from "express";
import * as invitationController from "./invitation.controller.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { createInvitationSchema, updateInvitationSchema, tokenParamSchema , idParamSchema} from "../../validators/invitation.validation.js";

const router = Router();

router.post("/", validate(createInvitationSchema), invitationController.createInvitation);
router.post("/accept/:token", validate(tokenParamSchema, "params") ,invitationController.handleInvitationResponse);
router.post("/reject/:token", validate(tokenParamSchema, "params"), invitationController.handleInvitationResponse);
router.get("/", invitationController.getAllInvitations);
router.get("/token/:token", validate(tokenParamSchema, "params"), invitationController.getInvitationByToken);
router.get("/:id", validate(idParamSchema, "params"),invitationController.getInvitationById);
router.put("/:id", validate(idParamSchema, "params"),validate(updateInvitationSchema), invitationController.updateInvitation);
router.delete("/:id", validate(idParamSchema, "params"),invitationController.deleteInvitation);

export default router;