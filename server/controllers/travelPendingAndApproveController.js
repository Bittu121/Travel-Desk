import { transporter } from "../utils/email.js";
import TravelRequestModel from "../models/travelRequestModel.js";
import LoginModel from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

//Pending request
export const getAllTravelRequestsByRole = async (req, res) => {
  try {
    const userRole = req.user.role;
    const userEmail = req.user.email;

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
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }
    res.json({
      success: true,
      data: travelRequests,
    });
  } catch (error) {
    console.error("Get All Travel Requests Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get all Travel Requests",
      error: error.message,
    });
  }
};

export const getTravelRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const travelRequest = await TravelRequestModel.findById(id);
    if (!travelRequest) {
      return res.status(404).json({ message: "Travel request not found" });
    }
    res.status(200).json({
      success: true,
      data: travelRequest,
    });
  } catch (error) {
    console.error("Get Travel Request Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get Travel Request",
      error: error.message,
    });
  }
};

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

export const updatePendingTravelRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateTravelRequestData = req.body;
    const updateTravelRequest = await TravelRequestModel.findByIdAndUpdate(
      id,
      updateTravelRequestData,
      { new: true },
    );

    if (!updateTravelRequest) {
      return res
        .status(404)
        .json({ success: false, message: "Travel Request not found" });
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
        `Travel Request Approved for ${updateTravelRequest.travelRequestId} – Action Required for Booking` // Subject
      );
    }
    res.status(200).json({
      success: true,
      data: updateTravelRequest,
      message: "Travel request status updated successfully",
    });
  } catch (error) {
    console.error("Update Travel Request Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update Travel Request",
    });
  }
};

//Approved request
