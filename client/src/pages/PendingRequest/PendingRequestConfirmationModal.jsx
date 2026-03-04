import React from "react";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../pages/LoadingSpinner.jsx";

function PendingRequestConfirmationModal({
  isOpen,
  onClose,
  isApproved,
  onConfirm,
}) {
  if (!isOpen) return null;
  const { loading } = useSelector((state) => state.travelRequest);

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50 bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-semibold mb-4">
            {isApproved ? "Approve" : "Reject"}
          </h2>
          <p className="text-gray-700 mb-6">
            Are you sure you want to {isApproved ? "approve" : "reject"} this
            request?
          </p>
          <div className="flex justify-end gap-4">
            <button
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </button>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <button
                className={`px-4 py-2 text-white rounded-lg cursor-pointer ${
                  isApproved
                    ? "bg-green-500 hover:bg-green-700"
                    : "bg-red-700 hover:bg-red-700"
                }`}
                onClick={onConfirm}
              >
                {isApproved ? "Approve" : "Reject"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PendingRequestConfirmationModal;
