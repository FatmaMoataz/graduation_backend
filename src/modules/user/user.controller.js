import * as userService from "./user.service.js";

// Get All Users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    return res.json({ message: "Done", users });
  } catch (err) {
    next(err);
  }
};

// Get User By ID
export const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ message: "Done", user });
  } catch (err) {
    next(err);
  }
};

// Get Current User
export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ message: "Done", user });
  } catch (err) {
    next(err);
  }
};

// Update User
export const updateUser = async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ message: "Updated", user });
  } catch (err) {
    next(err);
  }
};

// Delete User
export const deleteUser = async (req, res, next) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};
