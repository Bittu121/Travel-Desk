import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import travelImage from "../../assets/travel.webp";

function ForgotPassword() {
  const [formData, setFormData] = useState({ email: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({ email: "" });
    // console.log("formData", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-pink-50 p-6">
      <div className="flex flex-col md:flex-row bg-white shadow-md rounded-2xl overflow-hidden w-full max-w-4xl min-h-[430px]">
        {/* Left Section */}
        <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-pink-500 p-8 text-white w-1/2">
          <img
            src={travelImage}
            alt="travel-desk"
            className="w-72 object-contain mb-4 rounded-b-full rounded-e-full"
          />
          <h2 className="text-2xl font-bold">Travel Desk</h2>
          <p className="text-sm mt-2 opacity-90">
            Connect with <span className="font-semibold">Bittu Kumar</span>
          </p>
        </div>
        {/* Right Section (Form) */}
        <div className="flex flex-col justify-center  w-full md:w-1/2 p-8">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Forgot Password
          </h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              className="w-full px-4 py-3 rounded-lg outline-none transition border border-blue-200"
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full py-3 font-semibold rounded-lg text-white bg-gradient-to-r from-pink-500 to-blue-600 hover:opacity-90 transition cursor-pointer"
              >
                {/* {loading ? <LoadingSpinner /> : "Send Reset Link"} */}Send
                Reset Link
              </button>
            </div>
            <div className="flex justify-end text-sm text-gray-600 mt-4">
              <Link to="/login" className="hover:underline">
                Remembered your password? Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
