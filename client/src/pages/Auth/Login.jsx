import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import travelImage from "../../assets/travel.webp";
import { login } from "../../action/authAction.js";
import LoadingSpinner from "../../pages/LoadingSpinner.jsx";

function Login() {
  const { loading } = useSelector((state) => state.auth);
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/dashboard");
    await dispatch(login(data));
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-pink-50 p-6">
        <div className="flex flex-col md:flex-row bg-white shadow-md rounded-2xl overflow-hidden w-full max-w-4xl min-h-[430px]">
          {/* Left Section */}
          <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-pink-500 p-8 text-white w-1/2">
            <img
              src={travelImage}
              alt="Travel"
              className="w-72 object-contain mb-4 rounded-b-full rounded-e-full"
            />
            <h2 className="text-2xl font-bold">Travel Desk</h2>
            <p className="text-sm mt-2 opacity-90">
              Connect with <span className="font-semibold">Bittu Kumar</span>
            </p>
          </div>

          {/* Right Section (Form) */}
          <div className="flex flex-col justify-center  w-full md:w-1/2 p-8">
            <h3 className="text-2xl font-medium text-center text-blue-500 mb-6">
              Login
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <input
                  className="w-full px-4 py-3 rounded-lg outline-none transition border border-blue-200"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  onChange={handleChange}
                  value={data.email}
                />
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg outline-none transition"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  required
                  onChange={handleChange}
                  value={data.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <AiOutlineEye size={22} className="cursor-pointer" />
                  ) : (
                    <AiOutlineEyeInvisible
                      size={22}
                      className="cursor-pointer"
                    />
                  )}
                </button>
              </div>

              {/* Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full py-3 font-semibold rounded-lg text-white bg-gradient-to-r from-pink-500 to-blue-600 hover:opacity-90 transition cursor-pointer"
                >
                  {loading ? <LoadingSpinner /> : "Login"}
                </button>
              </div>

              {/* Links */}
              <div className="flex justify-end text-sm text-gray-600 mt-4">
                <Link to="/forgot-password" className="hover:underline">
                  Forgot Password?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
