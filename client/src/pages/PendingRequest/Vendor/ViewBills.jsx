import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";
import {
  deleteBill,
  getUploadBillsByRequestId,
} from "../../../api/uploadBillsAndTickestApi";

function ViewBills({ _id }) {
  const [updatedBill, setUpdatedBill] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("view");
  const [selectedFile, setSelectedFile] = useState(null);

  const fetchBills = async () => {
    try {
      const response = await getUploadBillsByRequestId(_id);
      setUpdatedBill(response?.data?.uploadBill || []);
    } catch (error) {
      console.error("Error fetching bills:", error);
    }
  };

  useEffect(() => {
    if (_id) fetchBills();
  }, [_id]);

  const filePath = import.meta.env.VITE_API_KEY;

  const viewTicketHandler = (e) => {
    const selectedUrl = e.target.value;
    if (selectedUrl !== "view") {
      setSelectedFile(selectedUrl);
      setIsOpen(true);
    }
    setSelected("view");
  };

  const handleView = () => {
    if (selectedFile) {
      window.open(`${filePath}${selectedFile}`, "_blank");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteBill(_id, selectedFile);
      toast.success(response?.data?.message);
      fetchBills();
      setIsOpen(false);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete Bill";
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <select
        className="bg-white px-3 py-1 border-1 border-gray-500 rounded text-sm cursor-pointer w-20 truncate outline-none"
        onChange={viewTicketHandler}
        value={selected}
      >
        <option value="view" disabled>
          View
        </option>
        {updatedBill?.length > 0 ? (
          updatedBill.map((path, index) => {
            const fileName = path
              .split("/")
              .pop()
              .split("-")
              .slice(1)
              .join("-");
            return (
              <option key={index} value={path}>
                {fileName}
              </option>
            );
          })
        ) : (
          <option disabled>No bills uploaded</option>
        )}
      </select>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative w-full max-w-sm rounded-3xl bg-white shadow-lg border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Bill Management
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  View or permanently delete bills
                </p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="h-10 w-10 flex items-center justify-center cursor-pointer rounded-xl hover:bg-slate-100 transition"
              >
                <RxCross2 size={22} className="text-slate-600" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                {/* View Card */}
                <button
                  onClick={handleView}
                  className="px-4 bg-blue-600 cursor-pointer text-white py-2.5 rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  View Bills
                </button>
                {/* Delete Card */}
                <button
                  onClick={handleDelete}
                  className="px-4 bg-red-600 cursor-pointer text-white py-2.5 rounded-lg hover:bg-red-700 transition font-medium"
                >
                  Delete Bills
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewBills;
