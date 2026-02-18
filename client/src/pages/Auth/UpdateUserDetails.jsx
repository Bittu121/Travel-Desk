import React, { useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { updateUser } from "../../api/authApi.js";

function UpdateUserDetails({ item, setUserData }) {
  const [editData, setEditData] = useState({
    fullName: "",
    empCode: "",
    designation: "",
    depil: "",
    rolartment: "",
    emae: "",
  });
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const updateUserHandler = (item) => {
    setSelectedUserId(item?._id);
    setEditData({
      fullName: item?.fullName,
      empCode: item?.empCode,
      designation: item?.designation,
      department: item?.department,
      email: item?.email,
      role: item?.role,
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
      }
      setIsOpen(false);
    } catch (error) {
      toast.error(updateresponse?.data?.message || "Failed to update user");
    }
  };

  return (
    <>
      <div>
        <FaUserEdit
          size={20}
          className="cursor-pointer text-gray-600 hover:text-blue-600 transition"
          onClick={() => updateUserHandler(item)}
        />

        {isOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            aria-modal="true"
            role="dialog"
          >
            <div className="w-full max-w-2xl rounded-xl bg-white shadow-lg">
              <div className="border-b px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Update User Details
                </h2>
              </div>
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-4 px-6 py-5 md:grid-cols-2"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={editData.fullName}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    EMP Code
                  </label>
                  <input
                    type="text"
                    name="empCode"
                    value={editData.empCode}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Designation
                  </label>
                  <input
                    type="text"
                    name="designation"
                    value={editData.designation}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Region
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={editData.department}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={editData.role}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div className="col-span-2 flex justify-end gap-3 border-t pt-4">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="rounded-md border border-gray-300 px-4 py-3 cursor-pointer text-sm text-gray-700 hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-blue-600 px-4 py-3 cursor-pointer text-sm font-medium text-white hover:bg-blue-700 transition"
                  >
                    Save Changes
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
