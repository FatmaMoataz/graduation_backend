import Auth from "../../db/models/auth.model.js";
import User from "../../db/models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "your-refresh-secret";

export const register = async (userData) => {
  // Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ email: userData.email }, { username: userData.username }]
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  // Create user
  const user = await User.create({
    ...userData,
    password: hashedPassword
  });

  // Create auth record
  await Auth.create({ userId: user._id });

  return user;
};

export const login = async (email, password) => {
  // Find user by email
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  // Compare passwords
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error("Invalid credentials");
  }

  // Generate tokens
  const accessToken = jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  const refreshToken = jwt.sign(
    { userId: user._id },
    JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  // Update auth record
  await Auth.findOneAndUpdate(
    { userId: user._id },
    { 
      refreshToken,
      lastLogin: new Date(),
      loginAttempts: 0
    }
  );

  return {
    user: user.toObject({ virtuals: true }),
    accessToken,
    refreshToken
  };
};

export const refreshToken = async (refreshToken) => {
  try {
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);

    // Find auth record
    const auth = await Auth.findOne({ userId: decoded.userId, refreshToken });

    if (!auth) {
      throw new Error("Refresh token not found");
    }

    // Find user
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Generate new access token
    const newAccessToken = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return {
      accessToken: newAccessToken,
      refreshToken
    };
  } catch (err) {
    throw new Error("Invalid refresh token");
  }
};

export const logout = async (userId) => {
  await Auth.findOneAndUpdate(
    { userId },
    { refreshToken: null }
  );
};

export const changePassword = async (userId, oldPassword, newPassword) => {
  // Find user
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  // Verify old password
  const passwordMatch = await bcrypt.compare(oldPassword, user.password);

  if (!passwordMatch) {
    throw new Error("Old password is incorrect");
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update password
  await User.findByIdAndUpdate(userId, { password: hashedPassword });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new Error("Invalid token");
  }
};
