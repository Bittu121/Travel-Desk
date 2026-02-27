import React, { useState } from "react";
import { FaUserEdit, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { updateUser } from "../../api/authApi.js";

function UpdateUserDetails({ item, setUserData }) {
  const [editData, setEditData] = useState({
    fullName: "",
    empCode: "",
    designation: "",
    department: "",
    email: "",
    role: "",
  });
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updateUserHandler = (item) => {
    setSelectedUserId(item?._id);
    setEditData({
      fullName: item?.fullName || "",
      empCode: item?.empCode || "",
      designation: item?.designation || "",
      department: item?.department || "",
      email: item?.email || "",
      role: item?.role || "",
    });
    setIsOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "role" ? value.toLowerCase() : value;
    setEditData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const updateresponse = await updateUser(selectedUserId, editData);
      if (updateresponse?.data?.success) {
        toast.success(
          updateresponse?.data?.message || "User updated successfully",
        );
        setUserData((prevData) =>
          prevData.map((user) =>
            user._id === selectedUserId ? updateresponse?.data?.user : user,
          ),
        );
        setIsOpen(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <button
          onClick={() => updateUserHandler(item)}
          className="p-2 rounded-lg hover:bg-indigo-50 transition-colors group"
          title="Edit User"
        >
          <FaUserEdit
            size={18}
            className="text-gray-500 group-hover:text-indigo-600 transition-colors"
          />
        </button>
        {isOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="w-full max-w-xl bg-white rounded-2xl shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Edit User
                  </h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <FaTimes className="text-gray-500" size={18} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="px-6 py-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={editData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400/20 focus:border-indigo-400 transition-all placeholder:text-gray-400"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-gray-700">
                      EMP Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="empCode"
                      value={editData.empCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400/20 focus:border-indigo-400 transition-all placeholder:text-gray-400"
                      placeholder="EMP001"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-gray-700">
                      Designation <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="designation"
                      value={editData.designation}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400/20 focus:border-indigo-400 transition-all placeholder:text-gray-400"
                      placeholder="Designation"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-gray-700">
                      Region <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="department"
                      value={editData.department}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400/20 focus:border-indigo-400 transition-all placeholder:text-gray-400"
                      placeholder="Region"
                      required
                    />
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={editData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400/20 focus:border-indigo-400 transition-all placeholder:text-gray-400"
                      placeholder="john@company.com"
                      required
                    />
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Role <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="role"
                      value={editData.role}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400/20 focus:border-indigo-400 transition-all bg-white capitalize"
                      required
                    >
                      <option value="" disabled>
                        Select a role
                      </option>
                      <option value="user">User</option>
                      <option value="manager">Manager</option>
                      <option value="finance">Finance</option>
                      <option value="vendor">Vendor</option>
                      <option value="hr">HR</option>
                      <option value="admin">Admin</option>
                      <option value="superadmin">Super Admin</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-3 mt-8 pt-5 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className=" cursor-pointer px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors rounded-lg bg-gray-100"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="cursor-pointer px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-xs"
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span>Saving...</span>
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default UpdateUserDetails;
