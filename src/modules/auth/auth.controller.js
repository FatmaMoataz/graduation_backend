import * as authService from "./auth.service.js";

// Register
export const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    return res.status(201).json({ 
      message: "User registered successfully", 
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    next(err);
  }
};

// Login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    
    return res.json({ 
      message: "Login successful", 
      ...result 
    });
  } catch (err) {
    next(err);
  }
};

// Refresh Token
export const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const tokens = await authService.refreshToken(refreshToken);
    
    return res.json({ 
      message: "Token refreshed", 
      ...tokens 
    });
  } catch (err) {
    next(err);
  }
};

// Logout
export const logout = async (req, res, next) => {
  try {
    await authService.logout(req.userId);
    return res.json({ message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};

// Change Password
export const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    await authService.changePassword(req.userId, oldPassword, newPassword);
    
    return res.json({ message: "Password changed successfully" });
  } catch (err) {
    next(err);
  }
};
