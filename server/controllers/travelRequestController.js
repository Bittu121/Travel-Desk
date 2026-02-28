import { transporter } from "../utils/email.js";
import {
  travelRequestSubmissionTemplate,
  travelRequestManagerApprovalTemplate,
} from "../utils/travelRequestEmailTemplates.js";
import Sequence from "../models/sequenceModel.js";
import TravelRequestModel from "../models/travelRequestModel.js";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const loginUrl = process.env.VITE_FRONTEND_KEY;

export const travelRequestForm = async (req, res) => {
  try {
    const travelRequestData = req.body;
    // console.log(travelRequestData);
    const userId = req.user.id;
    const userEmail = req.user.email;
    // console.log(req?.user?.email)

    if (!userId || !userEmail) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
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

    res.status(201).json({
      success: true,
      data: savedRequest,
      message: "Travel request submitted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to submit Travel Request form",
      error: error.message,
    });
  }
};

//Applied form Details
export const getUserTravelRequests = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
    const userTravelRequests = await TravelRequestModel.find({ userId });

    res.status(200).json({
      success: true,
      data: userTravelRequests,
      message: "User travel requests fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user travel requests",
      error: error.message,
    });
  }
};


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
    } else if (userRole === "vender") {
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


