// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import LoadingSpinner from "../LoadingSpinner.jsx";
// import { register } from "../../action/authAction.js";

// function Signup() {
//   const { loading } = useSelector((state) => state.auth);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [data, setData] = useState({
//     fullName: "",
//     empCode: "",
//     designation: "",
//     department: "",
//     email: "",
//     password: "",
//     role: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const result = await dispatch(register(data));
//       if (result.type === "REGISTER_SUCCESS") {
//         navigate("/login");
//       }
//       setData({
//         fullName: "",
//         empCode: "",
//         designation: "",
//         department: "",
//         email: "",
//         password: "",
//         role: "",
//       });
//     } catch (error) {
//       console.log("Error fetching in user creation");
//     }
//   };

//   return (
//     <>
//       <div className="flex items-center justify-center bg-gray-100 px-4 py-3">
//         <form
//           onSubmit={handleSubmit}
//           className="w-full max-w-xl rounded-xl border border-gray-200 bg-white shadow-sm px-8 py-7"
//         >
//           {/* Title */}
//           <h3 className="mb-6 text-center text-lg font-semibold text-gray-900">
//             Create User
//           </h3>

//           {/* Role */}
//           <div className="mb-5">
//             <select
//               name="role"
//               required
//               onChange={handleChange}
//               value={data.role}
//               className="
//           w-full rounded-md border border-gray-300 bg-white
//           px-3 py-3 text-sm text-gray-900
//           outline-none transition
//           focus:border-blue-600
//           focus:ring-1 focus:ring-blue-600
//         "
//             >
//               <option value="">Select role</option>
//               <option value="user">Employee</option>
//               <option value="manager">Manager</option>
//               <option value="hr">HR</option>
//               <option value="vendor">Vendor</option>
//               <option value="finance">Finance</option>
//             </select>
//           </div>

//           {/* Fields */}
//           <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//             <input
//               type="text"
//               name="fullName"
//               placeholder="Full Name"
//               required
//               onChange={handleChange}
//               value={data.fullName}
//               className="
//           w-full rounded-md border border-gray-300
//           px-3 py-3 text-sm text-gray-900
//           placeholder-gray-400
//           outline-none transition
//           focus:border-blue-600
//           focus:ring-1 focus:ring-blue-600
//         "
//             />

//             <input
//               type="text"
//               name="empCode"
//               placeholder="Employee ID"
//               required
//               onChange={handleChange}
//               value={data.empCode}
//               className="
//           w-full rounded-md border border-gray-300
//           px-3 py-3 text-sm text-gray-900
//           placeholder-gray-400
//           outline-none transition
//           focus:border-blue-600
//           focus:ring-1 focus:ring-blue-600
//         "
//             />

//             <input
//               type="text"
//               name="designation"
//               placeholder="Designation"
//               required
//               onChange={handleChange}
//               value={data.designation}
//               className="
//           w-full rounded-md border border-gray-300
//           px-3 py-3 text-sm text-gray-900
//           placeholder-gray-400
//           outline-none transition
//           focus:border-blue-600
//           focus:ring-1 focus:ring-blue-600
//         "
//             />

//             <input
//               type="text"
//               name="department"
//               placeholder="Department"
//               required
//               onChange={handleChange}
//               value={data.department}
//               className="
//           w-full rounded-md border border-gray-300
//           px-3 py-3 text-sm text-gray-900
//           placeholder-gray-400
//           outline-none transition
//           focus:border-blue-600
//           focus:ring-1 focus:ring-blue-600
//         "
//             />

//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               required
//               onChange={handleChange}
//               value={data.email}
//               className="
//           w-full rounded-md border border-gray-300
//           px-3 py-3 text-sm text-gray-900
//           placeholder-gray-400
//           outline-none transition
//           focus:border-blue-600
//           focus:ring-1 focus:ring-blue-600
//         "
//             />

//             {/* Password */}
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Password"
//                 required
//                 onChange={handleChange}
//                 value={data.password}
//                 className="
//             w-full rounded-md border border-gray-300
//             px-3 py-3 text-sm text-gray-900
//             placeholder-gray-400
//             outline-none transition
//             focus:border-blue-600
//             focus:ring-1 focus:ring-blue-600
//           "
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
//               >
//                 {showPassword ? (
//                   <AiOutlineEye size={18} />
//                 ) : (
//                   <AiOutlineEyeInvisible size={18} />
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Action */}
//           <div className="mt-6 flex justify-end">
//             <button
//               type="submit"
//               disabled={loading}
//               className="
//           inline-flex items-center
//           rounded-md bg-blue-600
//           px-5 py-3 cursor-pointer
//           text-sm font-medium text-white
//           transition
//           hover:bg-blue-700
//           disabled:bg-blue-300 disabled:cursor-not-allowed
//         "
//             >
//               {loading ? <LoadingSpinner /> : "Create User"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }

// export default Signup;
