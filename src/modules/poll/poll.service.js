import Poll from "../../db/models/poll/Poll.model.js";
import PollVote from "../../db/models/poll/PollVote.model.js";

// CREATE POLL
export const createPollService = async (data) => {
  const poll = await Poll.create(data);

  await poll.populate("userId", "username email");
  await poll.populate("postId");
  await poll.populate("communityId");

  return {
    success: true,
    message: "Poll created successfully",
    data: poll,
  };
};

// GET ALL POLLS
export const getAllPollsService = async () => {
  const polls = await Poll.find()
    .populate("userId", "username email")
    .populate("postId")
    .populate("communityId");

  return {
    success: true,
    results: polls.length,
    data: polls,
  };
};

// VOTE
export const votePollService = async (data = {}) => {
  if (!data || typeof data !== "object") {
    throw new Error("Vote payload is missing or invalid");
  }

  const { pollId, optionText, userId } = data;

  // Check if user already voted for this poll
  const existingVote = await PollVote.findOne({ pollId, userId });

  if (existingVote) {
    return {
      success: false,
      message: "User has already voted on this poll",
    };
  }

  const vote = await PollVote.create({
    pollId,
    optionText,
    userId,
  });

  return {
    success: true,
    message: "Vote added successfully",
    data: vote,
  };
};

// GET RESULTS
export const getPollResultsService = async (pollId) => {
  const poll = await Poll.findById(pollId);

  if (!poll) {
    return {
      success: false,
      message: "Poll not found",
    };
  }

  const votes = await PollVote.find({ pollId });

  const result = {};

  votes.forEach((v) => {
    result[v.optionText] = (result[v.optionText] || 0) + 1;
  });

  return {
    success: true,
    data: result,
  };
};