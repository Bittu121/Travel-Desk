import { transporter } from "../utils/email.js";
import TravelRequestModel from "../models/travelRequestModel.js";
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

//Approved request
