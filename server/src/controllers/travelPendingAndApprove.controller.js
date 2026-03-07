import asyncHandler from "../utils/asyncHandler.js";
import dotenv from "dotenv";
import {
  getAllTravelRequestsByRoleService,
  getApprovedRequestDataService,
  getTravelRequestServiceById,
  updatePendingTravelRequestServiceById,
} from "../services/travelPendingAndApprove.services.js";
import { travelRequestResponseDTO } from "../dto/travelRequest/travelRequestResponse.dto.js";
import { updateTravelRequestDTO } from "../dto/travelRequest/updateTravelRequest.dto.js";
dotenv.config();

//Pending request
export const getAllTravelRequestsByRole = asyncHandler(async (req, res) => {
  const userRole = req.user.role;
  const userEmail = req.user.email;

  const travelRequests = await getAllTravelRequestsByRoleService(
    userRole,
    userEmail,
  );
  const response = travelRequests.map(travelRequestResponseDTO);
  res.json({
    success: true,
    // data: travelRequests,
    data: response,
  });
});

export const getTravelRequestById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const travelRequest = await getTravelRequestServiceById(id);
  res.status(200).json({
    success: true,
    data: travelRequestResponseDTO(travelRequest),
  });
});

export const updatePendingTravelRequestById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // const updateTravelRequestData = req.body;
  const dto = updateTravelRequestDTO(req.body);
  const updateTravelRequest = await updatePendingTravelRequestServiceById(
    id,
    // updateTravelRequestData,
    dto,
  );

  res.status(200).json({
    success: true,
    // data: updateTravelRequest,
    data: travelRequestResponseDTO(updateTravelRequest),
    message: "Travel request status updated successfully",
  });
});

//Get Approved Request Data
export const getApprovedRequestData = asyncHandler(async (req, res) => {
  const userRole = req.user.role;
  const travelRequestsAcceptedDetails =
    await getApprovedRequestDataService(userRole);

  const response = travelRequestsAcceptedDetails.map(travelRequestResponseDTO);

  res.status(200).json({
    success: true,
    // data: travelRequestsAcceptedDetails,
    data: response,
    message: "Filtered travel requests fetched successfully",
  });
});
