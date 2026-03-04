import { transporter } from "../utils/email.js";
import {
  travelRequestSubmissionTemplate,
  travelRequestManagerApprovalTemplate,
} from "../utils/travelRequestEmailTemplates.js";
import Sequence from "../models/sequence.model.js";
import TravelRequestModel from "../models/travelRequest.model.js";
import AppError from "../utils/appError.js";

const loginUrl = process.env.VITE_FRONTEND_KEY;

//travelRequestFormService
export const travelRequestFormService = async (
  travelRequestData,
  userId,
  userEmail,
) => {
  if (!userId || !userEmail) {
    throw new AppError("User not found", 404);
  }
  const counter = await Sequence.findOneAndUpdate(
    { name: "travelRequestId" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true },
  );
  const travelRequestId = `Travel/${counter.seq}`;

  travelRequestData.email = userEmail;

  travelRequestData.travelRequestId = travelRequestId;

  const newTravelRequest = new TravelRequestModel({
    userId,
    ...travelRequestData,
    travelRequestId,
  });
  const savedRequest = await newTravelRequest.save();
  // Send confirmation email to the user upon successful submission
  const userMailOptions = travelRequestSubmissionTemplate(
    travelRequestData,
    loginUrl,
  );
  transporter.sendMail(userMailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email to user:", error);
    }
  });

  // Send approval request email to the reporting manager
  const managerMailOptions = travelRequestManagerApprovalTemplate(
    travelRequestData,
    loginUrl,
  );
  transporter.sendMail(managerMailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email to manager:", error);
    }
  });
  return savedRequest;
};

//getUserTravelRequestService
export const getUserTravelRequestServices = async (userId) => {
  if (!userId) {
    throw new AppError("User not found", 404);
  }
  const userTravelRequests = await TravelRequestModel.find({ userId });
  return userTravelRequests;
};
