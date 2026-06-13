import asyncHandler from "../utils/asyncHandler.js";
import { travelRequestResponseDTO } from "../dto/travelRequest/travelRequestResponse.dto.js";
import {
  updateBookedTicketStatusService,
  updateBookMarkService,
  updateStatusService,
} from "../services/checkedStatus.services.js";

//Payment
export const updateStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updatedRequest = await updateStatusService(id, status);
  res.status(200).json({
    success: true,
    data: updatedRequest,
    message: "Status updated successfully",
  });
});

//Vendor Status
export const updateBookMark = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { bookMarks } = req.body;
  const updatedRequest = await updateBookMarkService(id, bookMarks);
  res.status(200).json({
    success: true,
    data: updatedRequest,
    message: "BookMarks updated successfully",
  });
});

//Ticket Status
export const updateBookedTicketStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { isBooked } = req.body;
  const updatedRequest = await updateBookedTicketStatusService(id, isBooked);
  res.status(200).json({
    success: true,
    data: updatedRequest,
    message: "Ticket status updated successfully",
  });
});
