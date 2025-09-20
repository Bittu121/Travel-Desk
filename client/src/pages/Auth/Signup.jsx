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
      <div className="flex justify-center items-center bg-[#F3F3F3] p-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl bg-white shadow-lg rounded-xl p-10"
        >
          <h3 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Create User
          </h3>
          <div className="mb-6">
            <select
              className="bg-gray-200 w-full px-4 py-2 rounded-lg outline-none cursor-pointer border border-blue-200"
              name="role"
              required
              onChange={handleChange}
              value={data.role}
            >
              <option value="">Select Role</option>
              <option value="user">Empolyee</option>
              <option value="manager">Manager</option>
              <option value="hr">HR</option>
              <option value="vender">Vendor</option>
              <option value="finance">Finance</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              className="bg-[#28343e12] w-full px-4 py-2 rounded-lg outline-none border border-blue-200"
              type="text"
              name="fullName"
              placeholder="Full Name"
              required
              onChange={handleChange}
              value={data.fullName}
            />
            <input
              className="bg-[#28343e12] w-full px-4 py-2 rounded-lg outline-none border border-blue-200"
              type="text"
              name="empCode"
              placeholder="Employee ID"
              required
              onChange={handleChange}
              value={data.empCode}
            />
            <input
              className="bg-[#28343e12] w-full px-4 py-2 rounded-lg outline-none border border-blue-200"
              type="text"
              name="designation"
              placeholder="Designation"
              required
              onChange={handleChange}
              value={data.designation}
            />
            <input
              className="bg-[#28343e12] w-full px-4 py-2 rounded-lg outline-none border border-blue-200"
              type="text"
              name="department"
              placeholder="Department"
              required
              onChange={handleChange}
              value={data.department}
            />
            <input
              className="bg-[#28343e12] w-full px-4 py-2 rounded-lg outline-none border border-blue-200"
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleChange}
              value={data.email}
            />
            <div className="relative w-full">
              <input
                className="bg-[#28343e12] w-full px-4 py-2 rounded-lg outline-none border border-blue-200"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
                onChange={handleChange}
                value={data.password}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-700 hover:text-gray-900 cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEye size={22} />
                ) : (
                  <AiOutlineEyeInvisible size={22} />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-8 py-2 text-lg text-white bg-blue-400 font-bold rounded-lg cursor-pointer transition-all duration-300 ease-in-out hover:bg-white hover:text-blue-600 hover:border-2 hover:border-blue-400"
          >
            {loading ? <LoadingSpinner /> : "Sign Up"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;
