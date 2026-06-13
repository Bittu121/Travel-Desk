import asyncHandler from "../utils/asyncHandler.js";
import { travelRequestResponseDTO } from "../dto/travelRequest/travelRequestResponse.dto.js";
import {
  deleteTicketService,
  getUploadTicketByRequestIdService,
  uploadTicketService,
} from "../services/uploadTickets.services.js";
import { uploadTicketDTO } from "../dto/tickets/uploadTicket.dto.js";

export const uploadTicket = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const filesDTO = uploadTicketDTO(req.files);
  const travelRequest = await uploadTicketService({
    requestId: id,
    files: filesDTO,
  });
  res.status(200).json({
    success: true,
    message: "Ticket uploaded successfully",
    data: travelRequestResponseDTO(travelRequest),
  });
});

//latest updated uploadTicket
export const getUploadTicketByRequestId = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const tickets = await getUploadTicketByRequestIdService(id);
  res.status(200).json({
    success: true,
    uploadTicket: tickets,
  });
});

//Delete a ticket from the uploaded tickets for a specific travel request
export const deleteTicket = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { filePath } = req.body;

  const uploadTicket = await deleteTicketService({ requestId: id, filePath });

  res.status(200).json({
    success: true,
    message: "Ticket deleted successfully",
    uploadTicket,
  });
});
