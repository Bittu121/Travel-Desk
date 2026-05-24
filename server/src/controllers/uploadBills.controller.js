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

  // deleteBillService
});
