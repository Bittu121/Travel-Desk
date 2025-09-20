import React, { useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { toast } from "react-toastify";

function UpdateUserDetails({ item }) {
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
      console.log("uk", selectedUserId, editData);
      //call api
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to update user");
    }
  };

  return (
    <>
      <div>
        <FaUserEdit
          size={26}
          className="cursor-pointer text-blue-600 hover:text-blue-700"
          onClick={() => updateUserHandler(item)}
        />
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-xl">
              <h2 className="text-2xl font-medium mb-4 text-center text-gray-700 pb-2">
                Update Details
              </h2>
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
              >
                <div>
                  <label className="block text-sm font-medium mb-1 text-start">
                    Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={editData.fullName}
                    onChange={handleInputChange}
                    className="w-full p-1.5 border rounded outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-start">
                    EMP Code
                  </label>
                  <input
                    type="text"
                    name="empCode"
                    value={editData.empCode}
                    onChange={handleInputChange}
                    className="w-full p-1.5 border rounded outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-start">
                    Designation
                  </label>
                  <input
                    type="text"
                    name="designation"
                    value={editData.designation}
                    onChange={handleInputChange}
                    className="w-full p-1.5 border rounded outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-start">
                    Region
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={editData.department}
                    onChange={handleInputChange}
                    className="w-full p-1.5 border rounded outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-start">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleInputChange}
                    className="w-full p-1.5 border rounded outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-start">
                    Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={editData.role}
                    onChange={handleInputChange}
                    className="w-full p-1.5 border rounded outline-none"
                  />
                </div>
                <div className="flex mt-4 col-span-2 justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-1.5 bg-gray-600 rounded-md hover:bg-gray-700 cursor-pointer text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-indigo-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
                  >
                    Save
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
