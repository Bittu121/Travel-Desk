import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

//Nodemailer
export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.error("Error connecting to Mailtrap:", error);
  } else {
    console.log("Server is ready to send emails:", success);
  }
});
