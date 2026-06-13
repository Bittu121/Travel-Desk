import TravelRequestModel from "../models/travelRequest.model.js";
import AppError from "../utils/appError.js";

export const uploadTicketService = async ({ requestId, files }) => {
  const travelRequest = await TravelRequestModel.findById(requestId);

  if (!travelRequest) {
    throw new AppError("Travel request not found", 404);
  }

  if (!files || files.length === 0) {
    throw new AppError("No file uploaded", 404);
  }

  const ticketData = files.map((file) => `/upload/ticket/${file.filename}`);

  const existingTickets = Array.isArray(travelRequest.uploadTicket)
    ? travelRequest.uploadTicket
    : [];

  travelRequest.uploadTicket = [...existingTickets, ...ticketData];

  await travelRequest.save();
  return travelRequest;
};

export const getUploadTicketByRequestIdService = async (requestId) => {
  const travelRequest = await TravelRequestModel.findById(requestId);
  if (!travelRequest) {
    throw new AppError("Travel request not found", 404);
  }
  return Array.isArray(travelRequest.uploadTicket)
    ? travelRequest.uploadTicket
    : [];
};

export const deleteTicketService = async ({ requestId, filePath }) => {
  const travelRequest = await TravelRequestModel.findById(requestId);

  if (!travelRequest) {
    throw new AppError("Travel request not found", 404);
  }

  if (
    !travelRequest.uploadTicket ||
    !travelRequest.uploadTicket.includes(filePath)
  ) {
    throw new AppError("File not found in uploaded tickets", 400);
  }

  const updatedTicketPaths = travelRequest.uploadTicket.filter(
    (path) => path !== filePath,
  );

  travelRequest.uploadTicket = updatedTicketPaths;
  await travelRequest.save();

  return travelRequest.uploadTicket;
};
