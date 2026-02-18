// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { Link, useNavigate } from "react-router-dom";
// import travelImage from "../../assets/travel.webp";
// import { login } from "../../action/authAction.js";
// import LoadingSpinner from "../../pages/LoadingSpinner.jsx";

// function Login() {
//   const { loading } = useSelector((state) => state.auth);
//   const [data, setData] = useState({ email: "", password: "" });
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     navigate("/dashboard");
//     await dispatch(login(data));
//   };

//   return (
//     <>
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-pink-50 p-6">
//         <div className="flex flex-col md:flex-row bg-white shadow-md rounded-2xl overflow-hidden w-full max-w-4xl min-h-[430px]">
//           {/* Left Section */}
//           <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-pink-500 p-8 text-white w-1/2">
//             <img
//               src={travelImage}
//               alt="Travel"
//               className="w-72 object-contain mb-4 rounded-b-full rounded-e-full"
//             />
//             <h2 className="text-2xl font-bold">Travel Desk</h2>
//             <p className="text-sm mt-2 opacity-90">
//               Connect with <span className="font-semibold">Bittu Kumar</span>
//             </p>
//           </div>

//           {/* Right Section (Form) */}
//           <div className="flex flex-col justify-center  w-full md:w-1/2 p-8">
//             <h3 className="text-2xl font-medium text-center text-blue-500 mb-6">
//               Login
//             </h3>
//             <form onSubmit={handleSubmit} className="space-y-5">
//               {/* Email */}
//               <div>
//                 <input
//                   className="w-full px-4 py-3 rounded-lg outline-none transition border border-blue-200"
//                   type="email"
//                   name="email"
//                   placeholder="Enter your email"
//                   required
//                   onChange={handleChange}
//                   value={data.email}
//                 />
//               </div>

//               {/* Password */}
//               <div className="relative">
//                 <input
//                   className="w-full px-4 py-3 border border-blue-200 rounded-lg outline-none transition"
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   placeholder="Enter your password"
//                   required
//                   onChange={handleChange}
//                   value={data.password}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
//                 >
//                   {showPassword ? (
//                     <AiOutlineEye size={22} className="cursor-pointer" />
//                   ) : (
//                     <AiOutlineEyeInvisible
//                       size={22}
//                       className="cursor-pointer"
//                     />
//                   )}
//                 </button>
//               </div>

//               {/* Button */}
//               <div className="flex justify-center">
//                 <button
//                   type="submit"
//                   className="w-full py-3 font-semibold rounded-lg text-white bg-gradient-to-r from-pink-500 to-blue-600 hover:opacity-90 transition cursor-pointer"
//                 >
//                   {loading ? <LoadingSpinner /> : "Login"}
//                 </button>
//               </div>

//               {/* Links */}
//               <div className="flex justify-end text-sm text-gray-600 mt-4">
//                 <Link to="/forgot-password" className="hover:underline">
//                   Forgot Password?
//                 </Link>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { Link, useNavigate } from "react-router-dom";
// import { login } from "../../action/authAction.js";
// import LoadingSpinner from "../../pages/LoadingSpinner.jsx";

// function Login() {
//   const { loading } = useSelector((state) => state.auth);
//   const [data, setData] = useState({ email: "", password: "" });
//   const [showPassword, setShowPassword] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await dispatch(login(data));
//     navigate("/dashboard");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
//       <div className="relative w-full max-w-5xl min-h-[480px] bg-white rounded-xl shadow-sm overflow-hidden grid grid-cols-12">

//         {/* LEFT DIAGONAL PANEL */}
//         <div className="relative col-span-5 hidden md:block">
//           {/* Base layer */}
//           <div
//             className="absolute inset-0 bg-blue-700"
//             style={{
//               clipPath: "polygon(0 0, 100% 0, 75% 100%, 0% 100%)",
//             }}
//           />

//           {/* Depth layer */}
//           <div
//             className="absolute inset-0 bg-blue-600/80"
//             style={{
//               clipPath: "polygon(0 0, 92% 0, 68% 100%, 0% 100%)",
//             }}
//           />

//           {/* Content */}
//           <div className="relative z-10 h-full flex flex-col justify-center px-12 text-white">
//             <h2 className="text-xl font-semibold tracking-tight">
//               Travel Desk
//             </h2>
//             <p className="mt-2 text-sm text-blue-100 max-w-xs leading-relaxed">
//               Secure internal access for employees and operations teams.
//             </p>

//             <div className="mt-10 h-px w-12 bg-blue-300/60" />

//             <p className="mt-4 text-xs text-blue-200">
//               Enterprise • Secure • Role-based
//             </p>
//           </div>
//         </div>

//         {/* RIGHT PANEL */}
//         <div className="col-span-12 md:col-span-7 flex items-center justify-center">
//           <div
//             className="
//               w-full max-w-md
//               bg-gray-50
//               border border-gray-200
//               rounded-xl
//               shadow-[0_8px_24px_rgba(0,0,0,0.08)]
//               px-9 py-11
//             "
//           >
//             <h3 className="text-sm font-semibold text-gray-900 mb-8">
//               Sign in
//             </h3>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Email */}
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 required
//                 value={data.email}
//                 onChange={handleChange}
//                 className="
//                   w-full rounded-md
//                   border border-gray-300
//                   bg-white
//                   px-3 py-2.5 text-sm
//                   text-gray-900 placeholder-gray-400
//                   outline-none transition
//                   focus:border-blue-600
//                   focus:ring-2 focus:ring-blue-600/20
//                 "
//               />

//               {/* Password */}
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   placeholder="Password"
//                   required
//                   value={data.password}
//                   onChange={handleChange}
//                   className="
//                     w-full rounded-md
//                     border border-gray-300
//                     bg-white
//                     px-3 py-2.5 text-sm
//                     text-gray-900 placeholder-gray-400
//                     outline-none transition
//                     focus:border-blue-600
//                     focus:ring-2 focus:ring-blue-600/20
//                   "
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
//                 >
//                   {showPassword ? (
//                     <AiOutlineEye size={18} />
//                   ) : (
//                     <AiOutlineEyeInvisible size={18} />
//                   )}
//                 </button>
//               </div>

//               {/* ACTIONS */}
//               <div className="flex items-center justify-between pt-3">
//                 <Link
//                   to="/forgot-password"
//                   className="text-sm text-gray-600 hover:underline"
//                 >
//                   Forgot password?
//                 </Link>

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="
//                     inline-flex items-center
//                     rounded-md bg-blue-600
//                     px-5 py-2
//                     text-sm font-medium text-white
//                     transition
//                     hover:bg-blue-700
//                     focus:outline-none focus:ring-2 focus:ring-blue-600/30
//                     disabled:bg-blue-300 disabled:cursor-not-allowed
//                   "
//                 >
//                   {loading ? <LoadingSpinner /> : "Sign in"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../action/authAction.js";
import LoadingSpinner from "../../pages/LoadingSpinner.jsx";

function Login() {
  const { loading, error } = useSelector((state) => state.auth);
  const [data, setData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(login(data));
    navigate("/dashboard");
  };

  const isDisabled = loading || !data.email || !data.password;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
      <div className="relative w-full max-w-5xl min-h-[480px] bg-white rounded-xl shadow-sm overflow-hidden grid grid-cols-12">
        {/* LEFT DIAGONAL PANEL */}
        <div className="relative col-span-5 hidden md:block">
          {/* Base layer */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500"
            style={{
              clipPath: "polygon(0 0, 100% 0, 86% 100%, 0% 100%)",
            }}
          />

          {/* Depth overlay */}
          <div
            className="absolute inset-0 bg-blue-800/10"
            style={{
              clipPath: "polygon(0 0, 96% 0, 80% 100%, 0% 100%)",
            }}
          />

          <div className="relative z-10 h-full flex flex-col justify-center px-12 text-white">
            <h2 className="text-2xl font-semibold tracking-tight">
              Travel Desk
            </h2>

            <p className="mt-3 text-sm text-blue-100 max-w-[18rem] leading-relaxed">
              Centralized platform for managing employee travel requests through
              structured approvals, vendor handling, and finance tracking.
            </p>

            <div className="mt-8 h-px w-10 bg-blue-300/60" />

            <p className="mt-3 text-xs text-blue-200 tracking-wide uppercase">
              Enterprise • Secure • Role-Based
            </p>
          </div>
        </div>
        <div className="col-span-12 md:col-span-7 flex items-center justify-center">
          <div
            className="
              w-full max-w-md
              bg-gray-50
              border border-gray-200
              rounded-xl
              shadow-[0_8px_24px_rgba(0,0,0,0.08),inset_-3px_0_0_rgba(37,99,235,0.15)]
              px-9 py-11
            "
          >
            <h3 className="text-md font-semibold text-gray-900 mb-8">
              Sign in
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  autoFocus
                  required
                  value={data.email}
                  onChange={handleChange}
                  className="
                    w-full rounded-md
                    border border-gray-300
                    bg-white
                    px-3 py-2.5 text-sm
                    text-gray-900 placeholder-gray-400
                    outline-none transition
                    focus:border-blue-600
                    focus:ring-2 focus:ring-blue-600/20
                  "
                />
              </div>
              <div className="relative">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  required
                  value={data.password}
                  onChange={handleChange}
                  className="
                    w-full rounded-md
                    border border-gray-300
                    bg-white
                    px-3 py-2.5 text-sm
                    text-gray-900 placeholder-gray-400
                    outline-none transition
                    focus:border-blue-600
                    focus:ring-2 focus:ring-blue-600/20
                  "
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <AiOutlineEye size={18} />
                  ) : (
                    <AiOutlineEyeInvisible size={18} />
                  )}
                </button>
              </div>
              {error && (
                <p className="text-sm text-red-600">
                  Invalid email or password
                </p>
              )}
              <div className="flex items-center justify-between pt-3">
                <Link
                  to="/forgot-password"
                  className="text-sm text-gray-600 hover:underline"
                >
                  Forgot password?
                </Link>

                <button
                  type="submit"
                  disabled={isDisabled}
                  className="
                    inline-flex items-center cursor-pointer
                    rounded-md bg-blue-600
                    px-5 py-3
                    text-sm font-medium text-white
                    transition
                    hover:bg-blue-700
                    focus:outline-none focus:ring-2 focus:ring-blue-600/30
                    disabled:bg-blue-300 disabled:cursor-not-allowed
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
