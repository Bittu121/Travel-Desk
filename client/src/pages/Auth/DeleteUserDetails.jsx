import React from "react";
import { MdDelete } from "react-icons/md";
import { deleteUser } from "../../api/authApi.js";
import { toast } from "react-toastify";

function DeleteUserDetails({ item, setUserData }) {
  const deleteUsers = async (id) => {
    try {
      const response = await deleteUser(id);
      if (response?.data?.success) {
        toast.success(response.data.message || "User deleted successfully");
        setUserData((prevData) => prevData.filter((user) => user._id !== id));
      } else {
        throw new Error(response?.data?.message || "Failed to delete user");
      }
    } catch (error) {
      toast.error(error.message || "Failed to delete user");
    }
  };
  return (
    <>
      <div>
        <MdDelete
          size={24}
          onClick={() => deleteUsers(item._id)}
          className="text-red-600 hover:text-red-800 cursor-pointer"
        />
      </div>
    </>
  );
}

export default DeleteUserDetails;
