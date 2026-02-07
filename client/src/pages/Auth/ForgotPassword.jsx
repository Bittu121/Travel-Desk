import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../LoadingSpinner.jsx";
import { forgotPassword } from "../../action/authAction.js";

function ForgotPassword() {
  const [formData, setFormData] = useState({ email: "" });
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const action = await dispatch(forgotPassword(formData));
    if (action?.type === "FORGOT_PASSWORD_SUCCESS") {
      setFormData({ email: "" });
      navigate("/login");
    }
    // console.log("formData", formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
      <div className="relative w-full max-w-5xl min-h-[480px] bg-white rounded-xl shadow-sm overflow-hidden grid grid-cols-12">
        {/* Left Section */}
        <div className="relative col-span-5 hidden md:block">
          <div
            className="absolute inset-0 bg-blue-700"
            style={{ clipPath: "polygon(0 0, 100% 0, 75% 100%, 0% 100%)" }}
          />
          <div
            className="absolute inset-0 bg-blue-600/80"
            style={{ clipPath: "polygon(0 0, 92% 0, 68% 100%, 0% 100%)" }}
          />

          <div className="relative z-10 h-full flex flex-col justify-center px-12 text-white">
            <h2 className="text-xl font-semibold tracking-tight">
              Travel Desk
            </h2>
            <p className="mt-2 text-sm text-blue-100 max-w-xs leading-relaxed">
              Secure internal access for employees and operations teams.
            </p>

            <div className="mt-10 h-px w-12 bg-blue-300/60" />

            <p className="mt-4 text-xs text-blue-200">
              Enterprise • Secure • Role-based
            </p>
          </div>
        </div>
        {/* Right Section */}
        <div className="col-span-12 md:col-span-7 flex items-center justify-center">
          <div className="w-full max-w-md bg-gray-50 border border-gray-200 rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] px-10 py-10">
            {/* Title */}
            <div className="mb-8">
              <h3 className="text-base font-semibold text-gray-900">
                Forgot Password
              </h3>
              <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">
                Enter your registered email address. We’ll send you a secure
                reset link.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                />
              </div>

              {/* Action Row */}
              <div className="flex items-center justify-between pt-2">
                <Link
                  to="/login"
                  className="text-sm text-gray-600 hover:text-gray-900 transition"
                >
                  Back to login
                </Link>

                <button
                  type="submit"
                  className="px-3 py-1 text-white bg-[#5553d6] rounded-md cursor-pointer transition-all duration-300 ease-in-out hover:bg-white hover:text-[#231ffc] hover:border-2 hover:border-[#231ffc]"
                  disabled={loading}
                >
                  {loading ? <LoadingSpinner /> : "Send Reset Link"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
