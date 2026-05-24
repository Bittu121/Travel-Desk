import path from "path";
import fs from "fs";
import TravelRequestModel from "../models/travelRequest.model.js";
import AppError from "../utils/appError.js";

export const uploadBillService = async ({ requestId, files }) => {
  const travelRequest = await TravelRequestModel.findById(requestId);

  if (!travelRequest) {
    throw new AppError("Travel request not found", 404);
  }

  if (!files || files.length === 0) {
    throw new AppError("No file uploaded", 404);
  }

  const billData = files.map((file) => ({
    fileName: file.originalname,
    filePath: `/upload/ticket/${file.filename}`,
    fileType: file.mimetype,
    size: file.size,
  }));

  const existingBills = Array.isArray(travelRequest.uploadBill)
    ? travelRequest.uploadBill
    : [];

  travelRequest.uploadBill = [...existingBills, ...billData];

  await travelRequest.save();
  return travelRequest;
};

export const getUploadBillsByRequestIdService = async (requestId) => {
  const travelRequest = await TravelRequestModel.findById(requestId);
  if (!travelRequest) {
    throw new AppError("Travel request not found", 404);
  }
  return Array.isArray(travelRequest.uploadBill)
    ? travelRequest.uploadBill
    : [];
};

export const deleteBillService = async () => {
    
};
