import { transporter } from "../utils/email.js";

export const travelRequestForm = async (req, res) => {
  try {
    
    res.status(201).json({
      success: true,
      //   data: savedRequest,
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
