import { transporter } from "../utils/email.js";
import TravelRequestModel from "../models/travelRequest.model.js";
import LoginModel from "../models/user.model.js";
import AppError from "../utils/appError.js";

//getAllTravelRequestsByRoleService
export const getAllTravelRequestsByRoleService = async (
  userRole,
  userEmail,
) => {
  let travelRequests;
  if (userRole === "manager") {
    travelRequests = await TravelRequestModel.find({
      reportingManager: userEmail,
    });
  } else if (userRole === "hr") {
    travelRequests = await TravelRequestModel.find({
      isB1Approved: true,
      isB2Approved: false,
      isB2Rejected: false,
    });
  } else if (userRole === "vendor") {
    travelRequests = await TravelRequestModel.find({
      isB2Approved: true,
    });
  } else {
    throw new AppError("Access Denied", 403);
  }
  return travelRequests;
};

//getTravelRequestServiceById
export const getTravelRequestServiceById = async (id) => {
  const travelRequest = await TravelRequestModel.findById(id);
  if (!travelRequest) {
    throw new AppError("Travel request not found", 404);
  }
  return travelRequest;
};

//updatePendingTravelRequestServiceById
const loginUrl = process.env.VITE_FRONTEND_KEY;
export const sendApprovalEmail = (
  email,
  lowerLevelEmail,
  approverRole,
  travelRequestData,
  subject = `Travel Request Approved for ${travelRequestData.travelRequestId}`, // Default subject
  customBody = null,
) => {
  let emailBody;
  if (approverRole === "manager") {
    emailBody = `
      <p>Dear Sir/Madam,</p>
      <p>The Travel Request with the following details has been approved by <strong>${lowerLevelEmail}</strong>:</p>
      <ul>
        <li>Travel Id: ${travelRequestData.travelRequestId}</li>
        <li>Employee Code: ${travelRequestData.empCode}</li>
        <li>Employee Name: ${travelRequestData.name}</li>
        <li>Designation: ${travelRequestData.designation}</li>
        <li>Travel Date: ${travelRequestData.travelDate}</li>
        <li>Return Date: ${travelRequestData.returnDate}</li>
      </ul>
      <p>Kindly review and proceed with the necessary further actions.</p>
      <p>Login : <a href="${loginUrl}" target="_blank">${loginUrl}</a></p>
      <br />
      <p>Best regards,</p>
      <p>Travel Desk Team</p>
    `;
  } else if (approverRole === "hr") {
    emailBody = `
      <p>Dear Travel Desk Team,</p>
      <p>The Travel Request with the following details has been approved by <strong>${lowerLevelEmail}</strong>:</p>
      <ul>
        <li>Travel Id: ${travelRequestData.travelRequestId}</li>
        <li>Employee Code: ${travelRequestData.empCode}</li>
        <li>Employee Name: ${travelRequestData.name}</li>
        <li>Designation: ${travelRequestData.designation}</li>
        <li>Travel Date: ${travelRequestData.travelDate}</li>
        <li>Return Date: ${travelRequestData.returnDate}</li>
      </ul>
      <p>Kindly proceed with the ticket/hotel booking and ensure that the relevant documents are uploaded to the portal.</p>
      <p>Please take the necessary action at the earliest.</p>
      <p>Login : <a href="${loginUrl}" target="_blank">${loginUrl}</a></p>
      <br />
      <p>Best regards,</p>
      <p>Travel Desk Team</p>
    `;
  }
  const mailOptions = {
    from: `Travel Desk <${process.env.EMAIL_USER}>`,
    to: email,
    subject: subject,
    html: typeof customBody === "string" ? customBody : emailBody,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending approval email:", error);
    }
  });
};

export const updatePendingTravelRequestServiceById = async (
  id,
  updateTravelRequestData,
) => {
  const updateTravelRequest = await TravelRequestModel.findByIdAndUpdate(
    id,
    updateTravelRequestData,
    { new: true },
  );

  if (!updateTravelRequest) {
    throw new AppError("Travel Request not found", 404);
  }
  // Get HR and vendor data
  const hr = await LoginModel.findOne({ role: "hr" });
  const vender = await LoginModel.findOne({ role: "vendor" });
  const selectedVendor = await LoginModel.findOne({
    email: updateTravelRequest.vendors,
    role: "vendor",
  });
  // Prepare employee details
  const employeeDetails = {
    travelRequestId: updateTravelRequest.travelRequestId,
    empCode: updateTravelRequest.empCode,
    name: updateTravelRequest.name,
    designation: updateTravelRequest.designation,
    travelDate: updateTravelRequest.travelDate,
    returnDate: updateTravelRequest.returnDate,
  };

  // Send approval email to the next approver based on the approval status
  if (updateTravelRequest.isB1Approved && !updateTravelRequest.isB2Approved) {
    sendApprovalEmail(
      hr?.email,
      updateTravelRequest.reportingManager,
      "manager", // Approver role
      employeeDetails, // Travel request data
      ` Travel Request Approved  for ${updateTravelRequest.travelRequestId}`,
    );
  } else if (updateTravelRequest.isB2Approved) {
    sendApprovalEmail(
      selectedVendor?.email,
      hr?.email,
      "hr", // Approver role
      employeeDetails, // Travel request data
      `Travel Request Approved for ${updateTravelRequest.travelRequestId} – Action Required for Booking`, // Subject
    );
  }
  return updateTravelRequest;
};

export const getApprovedRequestDataService = async (userRole) => {
  let travelRequestsAcceptedDetails;
  if (userRole === "manager") {
    travelRequestsAcceptedDetails = await TravelRequestModel.find({
      isB1Approved: true,
    });
  } else if (userRole === "hr") {
    travelRequestsAcceptedDetails = await TravelRequestModel.find({
      isB2Approved: true,
    });
  } else if (userRole === "vender") {
    travelRequestsAcceptedDetails = await TravelRequestModel.find({
      isB3Approved: true,
    });
  } else if (userRole === "finance") {
    travelRequestsAcceptedDetails = await TravelRequestModel.find({
      isB2Approved: true,
    });
  } else {
    throw new AppError("Access Denied", 403);
  }
  return travelRequestsAcceptedDetails;
};
