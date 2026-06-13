import asyncHandler from "../utils/asyncHandler.js";
import { travelRequestResponseDTO } from "../dto/travelRequest/travelRequestResponse.dto.js";
import {
  deleteBillService,
  getUploadBillsByRequestIdService,
  uploadBillService,
} from "../services/uploadBills.services.js";
import { uploadBillDTO } from "../dto/bills/uploadBill.dto.js";

export const uploadBill = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const filesDTO = uploadBillDTO(req.files);
  const travelRequest = await uploadBillService({
    requestId: id,
    files: filesDTO,
  });
  res.status(200).json({
    success: true,
    message: "Bill uploaded successfully",
    data: travelRequestResponseDTO(travelRequest),
  });
});

//latest updated uploadBill
export const getUploadBillsByRequestId = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const bills = await getUploadBillsByRequestIdService(id);
  res.status(200).json({
    success: true,
    uploadBill: bills,
  });
});

//Delete a bill from the uploaded bills for a specific travel request
export const deleteBill = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { filePath } = req.body;

  // DEBUG
  // console.debug("deleteBill method:", req.method);
  // console.debug("deleteBill content-type:", req.get("content-type"));
  // console.debug("deleteBill content-length:", req.get("content-length"));
  // console.debug("deleteBill headers:", req.headers);
  // console.debug("deleteBill req.body:", req.body);
  // console.debug("deleteBill req.query:", req.query);
  // const filePath =
  //   req.body?.filePath || req.query?.filePath || req.get("x-file-path");

  const uploadBill = await deleteBillService({ requestId: id, filePath });

  res.status(200).json({
    success: true,
    message: "Bill deleted successfully",
    uploadBill,
  });
});
