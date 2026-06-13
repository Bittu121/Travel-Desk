import React from "react";

function ViewTicketsInApprovedRequest({ item }) {
  const filePath = import.meta.env.VITE_API_KEY;

  const handleFileSelection = (e) => {
    const selectedFile = e.target.value;
    if (selectedFile !== "view") {
      window.open(`${filePath}${selectedFile}`, "_blank");
    }
  };

  return (
    <div>
      <select
        className="bg-white px-3 py-1 border-1 border-gray-500 rounded text-sm cursor-pointer w-20 truncate outline-none"
        onChange={handleFileSelection}
        value="view"
      >
        <option value="view" disabled>
          View
        </option>
        {item?.length > 0 ? (
          item?.map((path, index) => {
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
          <option disabled>No Ticket uploaded</option>
        )}
      </select>
    </div>
  );
}

export default ViewTicketsInApprovedRequest;
