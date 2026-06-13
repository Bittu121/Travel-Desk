import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdUploadFile } from "react-icons/md";
import { uploadBill } from "../../../action/uploadBillsAndTickestAction";

function UploadBills({ _id }) {
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

    dispatch(uploadBill(_id, formData));
  };
  return (
    <div>
      <div>
        <label className="flex bg-blue-500 text-white px-3 py-1 rounded cursor-pointer">
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
            ❌ Failed to upload bill: {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default UploadBills;
