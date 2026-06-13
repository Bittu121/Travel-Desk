import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../LoadingSpinner.jsx";
import { forgotPassword } from "../../action/authAction.js";
import LeftSideContent from "./LeftSideContent.jsx";

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
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-6">
      <div
        className="
        relative w-full min-h-[520px]
        bg-white
        rounded-md
        border border-gray-200
        shadow-xs
        overflow-hidden
        grid grid-cols-12"
      >
        <LeftSideContent />
        {/* Right Section */}
        <div className="col-span-12 md:col-span-7 flex items-center justify-center bg-white">
          <div
            className="
      w-full max-w-md
      bg-white
      border border-gray-200
      rounded-lg
      shadow-xs
      px-10 py-12
    "
          >
            <div className="mb-10">
              <p className="text-sm text-slate-500">Password recovery</p>
              <h3 className="text-2xl font-semibold text-slate-900 mt-1">
                Reset your password
              </h3>
              <p className="text-sm text-slate-500 mt-2">
                Enter your registered email. We’ll send you a secure reset link.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className="
            w-full rounded-lg
            border border-slate-300
            bg-white
            px-4 py-3 text-sm
            text-slate-900 placeholder-slate-400
            outline-none transition
            focus:border-blue-600
            focus:ring-4 focus:ring-blue-600/10
          "
                />
              </div>
              <div className="flex items-center justify-between pt-4">
                <Link
                  to="/login"
                  className="text-sm text-slate-500 hover:text-slate-800 transition"
                >
                  Back to login
                </Link>
                <button
                  type="submit"
                  disabled={loading || !formData.email}
                  className="
            inline-flex items-center justify-center
            rounded-lg bg-blue-600
            px-6 py-3
            text-sm font-medium text-white
            transition-all
            hover:bg-blue-700
            hover:shadow-md hover:shadow-blue-600/20
            focus:outline-none focus:ring-4 focus:ring-blue-600/20
            disabled:bg-blue-300 disabled:cursor-not-allowed
            cursor-pointer
          "
                >
                  {loading ? <LoadingSpinner /> : "Send link"}
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
