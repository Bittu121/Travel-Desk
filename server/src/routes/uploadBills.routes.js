import express from "express";
import authMiddleWare from "../middleware/AuthMiddleware.js";
import { isAuthorized } from "../middleware/isAuthorized.js";
import { upload } from "../middleware/upload.js";
import {
  deleteBill,
  getUploadBillsByRequestId,
  uploadBill,
} from "../controllers/uploadBills.Controller.js";

const router = express.Router();

router
  .route("/upload-bill/:id")
  .put(
    authMiddleWare,
    isAuthorized(["vender"]),
    upload.array("files"),
    uploadBill,
  );

router
  .route("/:id/uploadBill")
  .get(authMiddleWare, isAuthorized(["vender"]), getUploadBillsByRequestId);

router
  .route("/:id/deleteBill")
  .delete(authMiddleWare, isAuthorized(["vender"]), deleteBill);

export default router;
