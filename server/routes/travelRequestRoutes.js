import express from "express";
import {
  getUserTravelRequests,
  travelRequestForm,
} from "../controllers/travelRequestController.js";
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

router
  .route("/requests/me")
  .get(
    authMiddleWare,
    isAuthorized(["user", "manager", "hr"]),
    getUserTravelRequests,
  );
  
export default router;
