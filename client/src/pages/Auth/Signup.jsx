import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import LoadingSpinner from "../LoadingSpinner.jsx";
import { register } from "../../action/authAction.js";

function Signup() {
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    fullName: "",
    empCode: "",
    designation: "",
    department: "",
    email: "",
    password: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(register(data));
      if (result.type === "REGISTER_SUCCESS") {
        navigate("/login");
      }
      setData({
        fullName: "",
        empCode: "",
        designation: "",
        department: "",
        email: "",
        password: "",
        role: "",
      });
    } catch (error) {
      console.log("Error fetching in user creation");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center p-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white rounded-lg shadow-sm border border-gray-100 p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Create user
          </h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Role <span className="text-gray-400">*</span>
              </label>
              <select
                name="role"
                required
                onChange={handleChange}
                value={data.role}
                className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400 text-gray-700"
              >
                <option value="">Select a role</option>
                <option value="user">Employee</option>
                <option value="manager">Manager</option>
                <option value="hr">HR</option>
                <option value="vendor">Vendor</option>
                <option value="finance">Finance</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Full name <span className="text-gray-400">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="Rahul Sharma"
                  onChange={handleChange}
                  value={data.fullName}
                  className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400 text-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Employee ID <span className="text-gray-400">*</span>
                </label>
                <input
                  type="text"
                  name="empCode"
                  required
                  placeholder="EMP1024"
                  onChange={handleChange}
                  value={data.empCode}
                  className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400 text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Designation <span className="text-gray-400">*</span>
                </label>
                <input
                  type="text"
                  name="designation"
                  required
                  placeholder="Software Engineer"
                  onChange={handleChange}
                  value={data.designation}
                  className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400 text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Department <span className="text-gray-400">*</span>
                </label>
                <input
                  type="text"
                  name="department"
                  required
                  placeholder="Engineering"
                  onChange={handleChange}
                  value={data.department}
                  className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400 text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Email <span className="text-gray-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@company.com"
                  onChange={handleChange}
                  value={data.email}
                  className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400 text-gray-700"
                />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Password <span className="text-gray-400">*</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="Enter your password"
                  onChange={handleChange}
                  value={data.password}
                  className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400 text-gray-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[30px] text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <AiOutlineEye size={16} />
                  ) : (
                    <AiOutlineEyeInvisible size={16} />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer h-10 px-5 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 focus:ring-2 focus:ring-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <LoadingSpinner /> : "Create user"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;
