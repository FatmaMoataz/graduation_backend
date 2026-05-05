import User from "../../db/models/user.model.js";

export const createUser = async (data) => {
  return await User.create(data);
};

export const getAllUsers = async () => {
  return await User.find().select("-password");
};

export const getUserById = async (id) => {
  return await User.findById(id).select("-password");
};

export const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const getUserByUsername = async (username) => {
  return await User.findOne({ username }).select("-password");
};

export const updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true }).select("-password");
};

export const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

export const updateUserPassword = async (id, hashedPassword) => {
  return await User.findByIdAndUpdate(id, { password: hashedPassword }, { new: true }).select("-password");
};
