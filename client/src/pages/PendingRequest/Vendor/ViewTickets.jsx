import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  deleteTicket,
  getUploadTicketByRequestId,
} from "../../../api/uploadBillsAndTickestApi";
import { RxCross2 } from "react-icons/rx";

function ViewTickets({ _id }) {
  const [selected, setSelected] = useState("view");
  const [updatedTicket, setUpdatedTicket] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const filePath = import.meta.env.VITE_API_KEY;

  const fetchTickets = async () => {
    try {
      const response = await getUploadTicketByRequestId(_id);
      setUpdatedTicket(response?.data?.uploadTicket || []);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  useEffect(() => {
    if (_id) fetchTickets();
  }, [_id]);

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
      const response = await deleteTicket(_id, selectedFile);
      toast.success(response?.data?.message);
      fetchTickets();
      setIsOpen(false);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete ticket";
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <select
        className="bg-white px-3 py-1 border border-gray-300 rounded text-sm cursor-pointer w-28 truncate outline-none"
        onChange={viewTicketHandler}
        value={selected}
      >
        <option value="view" disabled>
          View
        </option>
        {updatedTicket?.length > 0 ? (
          updatedTicket.map((path, index) => {
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
          <option disabled>No tickets uploaded</option>
        )}
      </select>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-sm px-4 py-6">
          <div className="relative w-full max-w-sm overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_32px_80px_rgba(15,23,42,0.12)]">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Tickets Management
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  View or delete uploaded tickets.
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
              >
                <RxCross2 size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={handleView}
                  disabled={!selectedFile}
                  className="rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  View Ticket
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={!selectedFile}
                  className="rounded-lg bg-red-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Delete Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewTickets;
