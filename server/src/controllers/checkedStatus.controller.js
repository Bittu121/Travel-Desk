import asyncHandler from "../utils/asyncHandler.js";
import { travelRequestResponseDTO } from "../dto/travelRequest/travelRequestResponse.dto.js";
import {
  updateBookedTicketStatusService,
  updateBookMarkService,
  updateStatusService,
} from "../services/checkedStatus.services.js";

//Payment
export const updateStatus = asyncHandler(async (req, res) => {
  // updateStatusService
});
export const updateBookMark = asyncHandler(async (req, res) => {
  // updateBookMarkService
});
export const updateBookedTicketStatus = asyncHandler(async (req, res) => {
  // updateBookedTicketStatusService
});
