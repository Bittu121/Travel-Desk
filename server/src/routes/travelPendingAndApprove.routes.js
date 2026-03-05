import express from "express";
import {
  getAllTravelRequestsByRole,
  getApprovedRequestData,
  getTravelRequestById,
  updatePendingTravelRequestById,
} from "../controllers/travelPendingAndApprove.controller.js";
import authMiddleWare from "../middleware/AuthMiddleware.js";
import { isAuthorized } from "../middleware/isAuthorized.js";

const router = express.Router();
router
  .route("/pending")
  .get(
    authMiddleWare,
    isAuthorized(["manager", "hr", "vendor"]),
    getAllTravelRequestsByRole,
  );

router.get("/pending/:id", authMiddleWare, getTravelRequestById);

router
  .route("/pending/update/:id")
  .put(
    authMiddleWare,
    isAuthorized(["manager", "hr", "vendor", "finance"]),
    updatePendingTravelRequestById,
  );

router
  .route("/approved-requests")
  .get(
    authMiddleWare,
    isAuthorized(["manager", "hr", "finance"]),
    getApprovedRequestData,
  );

export default router;
