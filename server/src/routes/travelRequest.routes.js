import express from "express";
import {
  getUserTravelRequests,
  travelRequestForm,
} from "../controllers/travelRequest.controller.js";
import authMiddleWare from "../middleware/AuthMiddleware.js";
import { isAuthorized } from "../middleware/isAuthorized.js";

const router = express.Router();

//travelRequestForm
router
  .route("/travel-request")
  .post(
    authMiddleWare,
    isAuthorized(["user", "manager", "hr","admin"]),
    travelRequestForm,
  );

//Applied form Details
router
  .route("/requests/me")
  .get(
    authMiddleWare,
    isAuthorized(["user", "manager", "hr","admin"]),
    getUserTravelRequests,
  );

export default router;
