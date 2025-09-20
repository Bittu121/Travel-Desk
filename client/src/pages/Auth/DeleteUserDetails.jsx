import React from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

function DeleteUserDetails({ item }) {
    
  const deleteUsers = async (id) => {
    try {
      console.log("id", id);
      //call api
    } catch (error) {
      toast.error(error.message || "Failed to delete user");
    }
  };
  return (
    <>
      <div>
        <MdDelete
          size={26}
          onClick={() => deleteUsers(item._id)}
          className="text-red-600 hover:text-red-800 cursor-pointer"
        />
      </div>
    </>
  );
}

export default DeleteUserDetails;
