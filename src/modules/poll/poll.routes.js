import { Router } from "express";
import * as pollController from "./poll.controller.js";
import { validate } from "../../middlewares/validation.middleware.js";

import {
  createPollSchema,
  votePollSchema,
} from "../../validators/poll.validation.js";

const router = Router();

// create poll
router.post(
  "/",
  validate(createPollSchema),
  pollController.createPoll
);

// get all polls
router.get("/", pollController.getAllPolls);

// vote
router.post(
  "/vote",
  validate(votePollSchema),
  pollController.votePoll
);

// results
router.get("/results/:id", pollController.getResults);

export default router;