import express from "express";
import { travelRequestForm } from "../controllers/travelRequestController.js";
import authMiddleWare from "../middleware/AuthMiddleware.js";
import { isAuthorized } from "../middleware/isAuthorized.js";

const router = express.Router();
router
  .route("/travel-request")
  .post(
    authMiddleWare,
    isAuthorized(["user", "manager", "hr"]),
    travelRequestForm,
  );
export default router;
