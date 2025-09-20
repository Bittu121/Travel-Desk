import LoginModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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
      !vendor
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
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    req.body.email = email.toLowerCase();
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }
    const user = await LoginModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    // generate token
    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );
    // set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (error) {
    // console.error("Login API Error:", error.message);
    // console.error(error.stack);
    // res.status(500).json({ success: false, message: "Internal server error",error: error.message });
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//logout user
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    return res
      .status(200)
      .json({ success: true, message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//get user data
export const getUserData = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }
    const user = await LoginModel.findById(userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await LoginModel.find();
    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
