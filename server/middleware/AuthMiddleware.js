import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authMiddleWare = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    // console.log("Token from cookies:", req.cookies.token);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Session expired. Please log in again.",
      });
    }
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded?.id,
      role: decoded?.role,
      email: decoded?.email,
    };
    next();
  } catch (error) {
    console.error("Authentication Error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Session expired. Please log in again.",
    });
  }
};

export default authMiddleWare;
