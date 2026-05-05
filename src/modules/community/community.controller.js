import * as communityService from "./community.service.js";

// Create
export const createCommunity = async (req, res, next) => {
  try {
    const community = await communityService.createCommunity(req.body, req.userId);
    return res.status(201).json({ message: "Created", community });
  } catch (err) {
    next(err);
  }
};

// Get All
export const getAllCommunities = async (req, res, next) => {
  try {
    const communities = await communityService.getAllCommunities();
    return res.json({ message: "Done", communities });
  } catch (err) {
    next(err);
  }
};

// Get One
export const getCommunity = async (req, res, next) => {
  try {
    const community = await communityService.getCommunityById(req.params.id);
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }
    return res.json({ message: "Done", community });
  } catch (err) {
    next(err);
  }
};

// Update
export const updateCommunity = async (req, res, next) => {
  try {
    const community = await communityService.updateCommunity(req.params.id, req.body);

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    return res.json({ message: "Updated", community });
  } catch (err) {
    next(err);
  }
};

// Delete
export const deleteCommunity = async (req, res, next) => {
  try {
    const deleted = await communityService.deleteCommunity(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Community not found" });
    }

    return res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};