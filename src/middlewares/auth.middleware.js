import { verifyToken } from "../modules/auth/auth.service.js";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token required" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    req.userId = decoded.userId;
    req.userEmail = decoded.email;
    req.userRole = decoded.role;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};