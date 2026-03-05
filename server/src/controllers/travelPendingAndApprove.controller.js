import asyncHandler from "../utils/asyncHandler.js";
import dotenv from "dotenv";
import {
  getAllTravelRequestsByRoleService,
  getApprovedRequestDataService,
  getTravelRequestServiceById,
  updatePendingTravelRequestServiceById,
} from "../services/travelPendingAndApprove.services.js";
dotenv.config();

//Pending request
export const getAllTravelRequestsByRole = asyncHandler(async (req, res) => {
  const userRole = req.user.role;
  const userEmail = req.user.email;

  const travelRequests = await getAllTravelRequestsByRoleService(
    userRole,
    userEmail,
  );
  res.json({
    success: true,
    data: travelRequests,
  });
});

export const getTravelRequestById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const travelRequest = await getTravelRequestServiceById(id);
  res.status(200).json({
    success: true,
    data: travelRequest,
  });
});

export const updatePendingTravelRequestById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateTravelRequestData = req.body;
  const updateTravelRequest = await updatePendingTravelRequestServiceById(
    id,
    updateTravelRequestData,
  );

  res.status(200).json({
    success: true,
    data: updateTravelRequest,
    message: "Travel request status updated successfully",
  });
});

//Get Approved Request Data
export const getApprovedRequestData = asyncHandler(async (req, res) => {
  const userRole = req.user.role;
  const travelRequestsAcceptedDetails =
    await getApprovedRequestDataService(userRole);

  res.status(200).json({
    success: true,
    data: travelRequestsAcceptedDetails,
    message: "Filtered travel requests fetched successfully",
  });
});
