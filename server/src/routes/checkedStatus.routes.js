import express from "express";
import authMiddleWare from "../middleware/AuthMiddleware.js";
import { isAuthorized } from "../middleware/isAuthorized.js";
import {
  updateBookedTicketStatus,
  updateBookMark,
  updateStatus,
} from "../controllers/checkedStatus.controller.js";

const router = express.Router();

router
  .route("/status/:id")
  .put(authMiddleWare, isAuthorized(["finance"]), updateStatus);

router
  .route("/bookMarks/:id")
  .put(authMiddleWare, isAuthorized(["vender"]), updateBookMark);

router
  .route("/updateBookedStatus/:id")
  .put(authMiddleWare, isAuthorized(["vender"]), updateBookedTicketStatus);

export default router;
