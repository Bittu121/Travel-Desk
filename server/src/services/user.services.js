import LoginModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { transporter } from "../utils/email.js";
import { loginCredentialsTemplate } from "../utils/loginCredentialsTemplate.js";
import AppError from "../utils/appError.js";

//registerUserService
export const registerUserService = async (data) => {
  const { fullName, empCode, designation, department, email, password, role } =
    data;
  const lowerEmail = email.toLowerCase();
  if (
    !fullName ||
    !empCode ||
    !designation ||
    !department ||
    !email ||
    !password ||
    !role
  ) {
    throw new AppError("All fields are required", 400);
  }

  const existingUser = await LoginModel.findOne({ email: lowerEmail });

  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new LoginModel({
    fullName,
    email: lowerEmail,
    empCode,
    designation,
    department,
    password: hashedPassword,
    role,
  });

  await user.save();

  // Send login credentials email to the user
  const loginUrl = process.env.VITE_FRONTEND_KEY;
  const mailOptions = loginCredentialsTemplate(
    fullName,
    email,
    password,
    loginUrl,
  );
  await transporter.sendMail(mailOptions);
  return user;
};

//loginUserService
export const loginUserService = async (data) => {
  const { email, password } = data;
  const normalizedEmail = email.toLowerCase();

  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }

  const user = await LoginModel.findOne({ email: normalizedEmail });
  if (!user) {
    throw new AppError("Invalid email or password", 400);
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new AppError("Invalid email or password", 400);
  }

  // generate token
  const token = jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "2h",
    },
  );

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
    },
  };
};

//logoutService
export const logoutService = async (data) => {
  // Future enhancements can go here:
  // - Add token blacklist logic
  // - Add refresh token deletion
  // - Add session invalidation
  // - Add audit logs
  return { message: "Logout successful" };
};

//getUserDataService
export const getUserDataService = async (userId) => {
  if (!userId) {
    throw new AppError("User ID is required", 400);
  }
  const user = await LoginModel.findById(userId).select("-password");
  if (!user) {
    throw new AppError("User not found", 404);
  }
  return user;
};

//getAllUsersService
export const getAllUsersService = async () => {
  const users = await LoginModel.find();
  return users;
};

//updateUserService
export const updateUserService = async (userId, updateData) => {
  if (!userId) {
    throw new AppError("User ID is required", 404);
  }
  const user = await LoginModel.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  const updatedUser = await LoginModel.findByIdAndUpdate(
    userId,
    { ...updateData },
    { new: true },
  ).select("-password");
  return updatedUser;
};

//deleteUserService
export const deleteUserService = async (userId) => {
  if (!userId) {
    throw new AppError("User ID is required", 400);
  }
  const deletedUser = await LoginModel.findByIdAndDelete(userId);
  if (!deletedUser) {
    throw new AppError("User not found", 404);
  }
};

//forgotPasswordService
export const forgotPasswordService = async (email) => {
  if (!email) {
    throw new AppError("Email is required", 404);
  }
  const user = await LoginModel.findOne({ email });
  if (!user) {
    throw new AppError("User not found", 404);
  }
  const token = crypto.randomBytes(32).toString("hex");
  const resetPasswordExpires = Date.now() + 10 * 60 * 1000; // Token valid for 10 minutes
  // Update only the resetPasswordToken and resetPasswordExpires fields
  await LoginModel.findByIdAndUpdate(user._id, {
    resetPasswordToken: token,
    resetPasswordExpires,
  });
  const resetLink = `${process.env.VITE_FRONTEND_KEY}/reset-password/${token}`;
  const mailOptions = {
    from: `"Travel Desk" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: "Password Reset Request",
    text: `You requested a password reset. Click the link below to reset your password:\n\n${resetLink}\n\nThis link will expire in 10 minutes. `,
  };
  await transporter.sendMail(mailOptions);
  return true;
};

//resetPasswordService
export const resetPasswordService = async (token, newPassword) => {
  if (!newPassword) {
    throw new AppError("New password is required", 404);
  }
  const user = await LoginModel.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new AppError("Invalid or expired token", 400);
  }
  
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  return true;
};

//getManagersService
export const getManagersService = async () => {
  const managers = await LoginModel.find({ role: "manager" });
  return managers;
};

//getVendorService
export const getVendorService = async () => {
  const vendors = await LoginModel.find({ role: "vendor" });
  return vendors;
};
