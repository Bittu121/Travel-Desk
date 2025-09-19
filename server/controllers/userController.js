import LoginModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { transporter } from "../utils/email.js";
import dotenv from "dotenv";
dotenv.config();

//register user
export const register = async (req, res) => {
  const { fullName, empCode, designation, department, email, password, role } =
    req.body;
  try {
    req.body.email = email.toLowerCase();
    if (
      !fullName ||
      !empCode ||
      !designation ||
      !department ||
      !email ||
      !password ||
      !role
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const existingUser = await LoginModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new LoginModel({
      fullName,
      email: req.body.email,
      empCode,
      designation,
      department,
      password: hashedPassword,
      role,
    });
   
    await user.save();
    const loginUrl = process.env.VITE_FRONTEND_KEY;
    //send email
    const mailOptions = {
      from: `"Travel Desk" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Login Credentials",
      html: `
      <p>Dear ${fullName},</p>
      <p>Your account has been successfully created.</p>
      <p>You can now login using your email: <strong>${email}</strong> and password: <strong>${password}</strong>.</p>
      <p><b>We recommend changing the password after your first login for security purposes.</b></p>
      <p>You can now log in using the following link: <a href="${loginUrl}" target="_blank">${loginUrl}</a></p>
      <p>Thank you,<br/>Vserv Team</p>
      `,
    };
    await transporter.sendMail(mailOptions);
    return res
      .status(201)
      .json({ success: true, message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//login user
export const login = async (req, res) => {};

//logout user
export const logout = async (req, res) => {};

//get user data
export const getUserData = async (req, res) => {};
