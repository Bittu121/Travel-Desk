import TravelRequestModel from "../models/travelRequest.model.js";
import AppError from "../utils/appError.js";

//Payment
export const updateStatusService = async (id, status) => {
  const updatedRequest = await TravelRequestModel.findByIdAndUpdate(
    id,
    { status },
    { new: true },
  );
  if (!updatedRequest) {
    throw new AppError("Travel request not found", 404);
  }
  return updatedRequest;
};

//Vendor Status
export const updateBookMarkService = async (id, bookMarks) => {
  const updatedRequest = await TravelRequestModel.findByIdAndUpdate(
    id,
    { bookMarks },
    { new: true },
  );
  if (!updatedRequest) {
    throw new AppError("Travel request not found", 404);
  }
  return updatedRequest;
};

//Ticket Status
export const updateBookedTicketStatusService = async (id, isBooked) => {
  const updatedRequest = await TravelRequestModel.findByIdAndUpdate(
    id,
    { isBooked },
    { new: true },
  );
  if (!updatedRequest) {
    throw new AppError("Travel request not found", 404);
  }
  return updatedRequest;
};
