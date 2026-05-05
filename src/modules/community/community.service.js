import Community from "../../db/models/community.model.js";

const COMMUNITY_POPULATES = [
  { path: "userId", select: "-password" },
  { path: "members", select: "-password" },
  { path: "posts" }
];

export const createCommunity = async (data, userId) => {
  const communityData = { ...data };

  if (userId) {
    communityData.userId = userId;
  }

  const community = await Community.create(communityData);
  return await Community.findById(community._id).populate(COMMUNITY_POPULATES);
};

export const getAllCommunities = async () => {
  return await Community.find().populate(COMMUNITY_POPULATES);
};

export const getCommunityById = async (id) => {
  return await Community.findById(id).populate(COMMUNITY_POPULATES);
};

export const updateCommunity = async (id, data) => {
  return await Community.findByIdAndUpdate(id, data, { new: true }).populate(COMMUNITY_POPULATES);
};

export const deleteCommunity = async (id) => {
  return await Community.findByIdAndDelete(id);
};