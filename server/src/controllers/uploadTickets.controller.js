import path from "path";
import fs from "fs";
import asyncHandler from "../utils/asyncHandler.js";
import { travelRequestResponseDTO } from "../dto/travelRequest/travelRequestResponse.dto.js";
import {
  deleteTicketService,
  getUploadTicketByRequestIdService,
  uploadTicketService,
} from "../services/uploadTickets.services.js";

export const uploadTicket = asyncHandler(async (req, res) => {
  // uploadTicketService
});

export const getUploadTicketByRequestId = asyncHandler(async (req, res) => {
  // getUploadTicketByRequestIdService
});

export const deleteTicket = asyncHandler(async (req, res) => {
  // deleteTicketService
});
