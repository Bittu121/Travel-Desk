import express from "express";
import {
  getAllTravelRequestsByRole,
  getTravelRequestById,
} from "../controllers/travelPendingAndApproveController.js";
import authMiddleWare from "../middleware/AuthMiddleware.js";
import { isAuthorized } from "../middleware/isAuthorized.js";

const router = express.Router();
router
  .route("/pending")
  .get(
    authMiddleWare,
    isAuthorized(["manager", "hr", "vender"]),
    getAllTravelRequestsByRole,
  );

router.get("/pending/:id", authMiddleWare, getTravelRequestById);

export default router;
