import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../action/authAction.js";
import LoadingSpinner from "../../pages/LoadingSpinner.jsx";
import logo from "../../../public/logo.png";

function Login() {
  const { loading } = useSelector((state) => state.auth);
  const [data, setData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(login(data));
    if (response?.type === "AUTH_SUCCESS") {
      setData({ email: "", password: "" });
      navigate("/dashboard");
    }
  };

  const isDisabled = loading || !data.email || !data.password;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
      <div
        className="
        relative w-full min-h-[520px]
        rounded-md
        border border-gray-200
        shadow-xs
        overflow-hidden
        grid grid-cols-12
      "
      >
        {/* LEFT SIDE */}
        <div className="col-span-5 hidden md:block bg-gradient-to-br from-slate-900 to-slate-800">
          <div className="h-full flex flex-col justify-center px-14 text-white">
            <div className="flex items-center gap-3">
              <img src={logo} className="w-12 rounded-md bg-white p-1" />
              <h2 className="text-2xl font-semibold tracking-tight">
                Travel Desk
              </h2>
            </div>
            <p className="mt-8 text-base font-light text-slate-300 leading-relaxed max-w-[22rem]">
              Multi-level approval matrix ensuring transparent, role-based
              validation across manager, HR, and booking workflows.
            </p>
            <div className="mt-12 h-px w-14 bg-slate-600/70" />
            <p className="mt-5 text-xs font-medium text-slate-400 tracking-[0.25em] uppercase">
              Secure • Scalable • Role-Based Access
            </p>
          </div>
        </div>
        {/* RIGHT SIDE */}
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
              <p className="text-sm text-slate-500">Welcome back</p>
              <h3 className="text-2xl font-semibold text-slate-900 mt-1">
                Sign in
              </h3>
              <p className="text-sm text-slate-500 mt-2">
                Access your Travel Desk dashboard.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email address"
                  autoFocus
                  required
                  value={data.email}
                  onChange={handleChange}
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
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  required
                  value={data.password}
                  onChange={handleChange}
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
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? (
                    <AiOutlineEye size={18} />
                  ) : (
                    <AiOutlineEyeInvisible size={18} />
                  )}
                </button>
              </div>
              <div className="flex items-center justify-between pt-4">
                <Link
                  to="/forgot-password"
                  className="text-sm text-slate-500 hover:text-slate-800 transition"
                >
                  Forgot password?
                </Link>
                <button
                  type="submit"
                  disabled={isDisabled}
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
                  {loading ? <LoadingSpinner /> : "Sign in"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
