import * as React from "react";
import Switch from "@mui/material/Switch";

import { toast } from "react-toastify";
import { updateBookedTicketStatus } from "../../../api/checkStatusApi";

function TicketStatus({ _id, getBookedStatus, fetchPendingRequestData }) {
  const [checked, setChecked] = React.useState(getBookedStatus);
  const handleChange = async (event) => {
    const newChecked = event.target.checked;
    try {
      const { data } = await updateBookedTicketStatus(_id, {
        isBooked: newChecked,
      });
      if (data?.success) {
        setChecked(newChecked);
        toast.success(data?.message);
        // Refetch so booked rows re-sort to the bottom and persist on refresh
        if (typeof fetchPendingRequestData === "function") {
          fetchPendingRequestData();
        }
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update Ticket Status";
      toast.error(errorMessage);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center gap-2">
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
        {checked && (
          <span className="px-2 py-1 text-xs font-semibold text-white bg-green-600 rounded-md animate-pulse">
            BOOKED
          </span>
        )}
      </div>
    </>
  );
}

export default TicketStatus;
//api call --> updateBookedTicketStatus  column -->[Ticket Status]
