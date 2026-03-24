import express from "express";
import authMiddleWare from "../middleware/AuthMiddleware.js";
import { isAuthorized } from "../middleware/isAuthorized.js";
import { upload } from "../middleware/upload.js";
import {
  deleteTicket,
  getUploadTicketByRequestId,
  uploadTicket,
} from "../controllers/uploadTickets.Controller.js";

const router = express.Router();

router
  .route("/upload-ticket/:id")
  .put(
    authMiddleWare,
    isAuthorized(["vender"]),
    upload.array("files"),
    uploadTicket,
  );

router
  .route("/:id/uploadTicket")
  .get(authMiddleWare, isAuthorized(["vender"]), getUploadTicketByRequestId);

router
  .route("/:id/deleteTicket")
  .delete(authMiddleWare, isAuthorized(["vender"]), deleteTicket);
export default router;
