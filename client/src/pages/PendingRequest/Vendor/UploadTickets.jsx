import React, { useState } from "react";
import { MdUploadFile } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { uploadTicket } from "../../../action/uploadBillsAndTickestAction";

function UploadTickets({ _id }) {
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.travelRequest);

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    const formData = new FormData();

    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });
    dispatch(uploadTicket(_id, formData));
  };

  return (
    <div>
      <div>
        <label className="flex bg-green-500 text-white px-3 py-1 rounded cursor-pointer">
          Upload{" "}
          <MdUploadFile className="items-center justify-center text-xl" />
          <input
            type="file"
            accept="application/pdf"
            multiple
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </label>
        {error && (
          <p className="text-red-500 text-sm mt-1">
            ❌ Failed to upload Ticket: {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default UploadTickets;
