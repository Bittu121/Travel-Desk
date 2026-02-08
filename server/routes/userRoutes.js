import express from "express";
import {
  login,
  logout,
  register,
  getUserData,
  getAllUsers,
  deleteUser,
  updateUser,
  forgotPassword,
  resetPassword,
  getManagers,
} from "../controllers/userController.js";
import authMiddleWare from "../middleware/AuthMiddleware.js";

const router = express.Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/").get(authMiddleWare, getUserData);

router.route("/all-users").get(authMiddleWare, getAllUsers);
router.route("/update-user/:userId").put(authMiddleWare, updateUser);
router.route("/delete-user/:userId").delete(authMiddleWare, deleteUser);

router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").post(resetPassword);

router.route("/managers").get(getManagers);

export default router;
