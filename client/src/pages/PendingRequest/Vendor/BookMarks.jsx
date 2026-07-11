import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateBookMark } from "../../../api/checkStatusApi";

function BookMarks({ item, fetchPendingRequestData }) {
  const { authData: user } = useSelector((state) => state.auth);
  const [bookMarked, setBookedMarked] = useState(item?.bookMarks || "");
  const [inputValue, setInputValue] = useState(bookMarked);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleBookMarkedUpdateClick = async () => {
    const newBookMarks = inputValue.trim().toLowerCase();
    setIsUpdating(true);
    try {
      const { data } = await updateBookMark(item?.id, {
        bookMarks: newBookMarks,
      });
      if (data?.success) {
        setBookedMarked(newBookMarks);
        setInputValue(newBookMarks);
        toast?.success(data?.message);
        if (typeof fetchPendingRequestData === "function") {
          fetchPendingRequestData();
        }
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update BookMarks";
      toast.error(errorMessage);
      setInputValue(bookMarked);
    } finally {
      setIsUpdating(false);
    }
  };

  if (user?.user?.role === "vendor") {
    return (
      <div className="flex items-center justify-center gap-2 w-full">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isUpdating}
          placeholder="Enter..."
          className={`px-2 py-1 border rounded-md outline-none w-24 text-sm ${
            isUpdating ? "cursor-wait opacity-50" : "cursor-text"
          }`}
        />
        <button
          onClick={handleBookMarkedUpdateClick}
          disabled={isUpdating}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-800 disabled:opacity-50 cursor-pointer"
        >
          {isUpdating ? "Updating..." : "Update"}
        </button>
      </div>
    );
  }
  if (["hr", "finance", "admin"].includes(user?.user?.role)) {
    return (
      <div className="px-3 py-1 capitalize">
        <input
          type="text"
          className="px-2 py-1 border rounded-md outline-none w-24 text-sm cursor-default text-black"
          value={bookMarked}
          readOnly
        />
      </div>
    );
  }

  return null;
}

export default BookMarks;

//Vendor status api --> updateBookMark  [only vendor can update] but seen [hr, finance]
