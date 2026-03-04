import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import {
  getUserTravelRequestServices,
  travelRequestFormService
} from "../services/travelRequest.services.js";
import asyncHandler from "../utils/asyncHandler.js";
dotenv.config();

const loginUrl = process.env.VITE_FRONTEND_KEY;

//travelRequestForm
export const travelRequestForm = asyncHandler(async (req, res) => {
  const travelRequestData = req.body;
  const userId = req.user.id;
  const userEmail = req.user.email;
  // console.log(req?.user?.email)
  const savedRequest = await travelRequestFormService(
    travelRequestData,
    userId,
    userEmail,
  );

  res.status(201).json({
    success: true,
    data: savedRequest,
    message: "Travel request submitted successfully.",
  });
});

//Applied form Details
export const getUserTravelRequests = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const userTravelRequests = await getUserTravelRequestServices(userId);
  res.status(200).json({
    success: true,
    data: userTravelRequests,
    message: "User travel requests fetched successfully",
  });
});
