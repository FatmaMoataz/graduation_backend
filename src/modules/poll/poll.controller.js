import * as pollService from "./poll.service.js";

// CREATE
export const createPoll = async (req, res, next) => {
  try {
    const result = await pollService.createPollService(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

// GET ALL
export const getAllPolls = async (req, res, next) => {
  try {
    const result = await pollService.getAllPollsService();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// VOTE
export const votePoll = async (req, res, next) => {
  try {
    const result = await pollService.votePollService(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

// RESULTS
export const getResults = async (req, res, next) => {
  try {
    const result = await pollService.getPollResultsService(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};