import express from "express";
import {
  login,
  logout,
  register,
  getUserData,
} from "../controllers/userController.js";
import authMiddleWare from "../middleware/AuthMiddleware.js";

const router = express.Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/").get(authMiddleWare, getUserData);
export default router;
