import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../LoadingSpinner.jsx";
import { resetPassword } from "../../action/authAction.js";

function ResetPassword() {
  const [formData, setFormData] = useState({ newPassword: "" });
  const { token } = useParams();
  //   console.log("Extracted token:", token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // API call
    const action = await dispatch(resetPassword(token, formData));
    if (action?.type === "RESET_PASSWORD_SUCCESS") {
      setFormData({ newPassword: "" });
      navigate("/login");
    }
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
            <h2 className="text-xl font-semibold">Travel Desk</h2>
            <p className="mt-2 text-sm text-blue-100 max-w-xs">
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
                Reset Password
              </h3>
              <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">
                Create a new strong password for your account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  New password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  required
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Enter new password"
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
                  {loading ? <LoadingSpinner /> : "Update password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
