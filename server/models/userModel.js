import mongoose, { Schema } from "mongoose";
const loginSchema = new Schema({
  fullName: { type: String, required: true },
  empCode: { type: String, required: true },
  designation: { type: String },
  department: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "manager", "hr", "vendor", "finance"],
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});
const LoginModel = mongoose.model("Login", loginSchema);
export default LoginModel;
