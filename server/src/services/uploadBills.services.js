import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import TravelRequestModel from "../models/travelRequest.model.js";
import AppError from "../utils/appError.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadBillService = async ({ requestId, files }) => {
  const travelRequest = await TravelRequestModel.findById(requestId);

  if (!travelRequest) {
    throw new AppError("Travel request not found", 404);
  }

  if (!files || files.length === 0) {
    throw new AppError("No file uploaded", 404);
  }

  const billData = files.map((file) => `/upload/ticket/${file.filename}`);

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

export const deleteBillService = async ({ requestId, filePath }) => {
  const travelRequest = await TravelRequestModel.findById(requestId);

  if (!travelRequest) {
    throw new AppError("Travel request not found", 404);
  }

  if (
    !travelRequest.uploadBill ||
    !travelRequest.uploadBill.includes(filePath)
  ) {
    throw new AppError("File not found in uploaded bills", 400);
  }

  const updatedBillPaths = travelRequest.uploadBill.filter(
    (path) => path !== filePath,
  );

  travelRequest.uploadBill = updatedBillPaths;
  await travelRequest.save();

  return travelRequest.uploadBill;
};
