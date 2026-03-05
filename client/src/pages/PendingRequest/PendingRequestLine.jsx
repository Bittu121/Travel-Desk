import React, { useEffect, useState } from "react";
import { LuCheck, LuX } from "react-icons/lu";
import PendingRequestConfirmationModal from "./PendingRequestConfirmationModal.jsx";
import AppliedFormTravelers from "../AppliedForm/AppliedFormTravelers.jsx";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVendors } from "../../action/authAction.js";
import UploadTicket from "./vendor-management/vendor-tickets/UploadTicket.jsx";
import ViewTicket from "./vendor-management/vendor-tickets/ViewTicket.jsx";
import UploadNewTicket from "./vendor-management/vendor-tickets/UploadNewTicket.jsx";
import ViewNewTicket from "./vendor-management/vendor-tickets/ViewNewTicket.jsx";
import BookMarks from "./vendor-management/vendor-status/BookMarks.jsx";
import TicketStatus from "./vendor-management/vendor-status/TicketStatus.jsx";

function PendingRequestLine({
  item,
  _id,
  travelRequestUpdate,
  setUpdate,
  setTravelRejected,
  setVendor,
  fetchPendingRequestData,
}) {
  const dispatch = useDispatch();
  const { authData: user } = useSelector((state) => state.auth);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApproved, setIsApproved] = useState(null);

  const [selectedVendor, setSelectedVendor] = useState("");
  const handleVendorChange = (e) => {
    setSelectedVendor(e.target.value);
    setVendor(e.target.value); // This updates the parent state
  };

  //get manager
  useEffect(() => {
    dispatch(getVendors());
  }, [dispatch]);
  const { vendors } = useSelector((state) => state.auth);
  const vendorsList = Array.isArray(vendors)
    ? vendors
    : (vendors?.vendors ?? []);

  const handleOpenModal = (approved) => {
    setIsApproved(approved);
    setIsModalOpen(true);
  };

  if (isApproved) {
    setUpdate(true);
    setTravelRejected(false);
  } else if (isApproved == false) {
    setUpdate(false);
    setTravelRejected(true);
  }

  const handleConfirm = () => {
    travelRequestUpdate(_id, isApproved, selectedVendor);
  };

  return (
    <>
      {!item?.isBooked && (
        <>
          <td className="px-4 py-4">{item.travelRequestId}</td>
          <td className="px-4 py-4">{item.name}</td>
          <td className="px-4 py-4">{item.empCode}</td>
          <td className="px-4 py-4">{item.designation}</td>
          <td className="px-4 py-4">{item.department}</td>
          <td className="px-4 py-4">
            {new Date(item.dateOfRequest).toLocaleDateString()}
          </td>
          <td className="px-4 py-4">
            {new Date(item.travelDate).toLocaleDateString()}
          </td>
          <td className="px-4 py-4">
            {new Date(item.returnDate).toLocaleDateString()}
          </td>
          <td className="px-4 py-4 ">{item.source}</td>
          <td className="px-4 py-4">{item.destination}</td>
          <td className="px-4 py-4">{item.purposeOfTravel}</td>
          <td className="px-4 py-4">{item.proposedVisit}</td>
          <td className="px-4 py-4">{item.travelMode}</td>
          <td className="px-4 py-4 capitalize">{item.hotelStay}</td>
          <td className="px-4 py-4 capitalize">
            {item.hotelStay === "no"
              ? "--"
              : new Date(item.checkInDate).toLocaleDateString()}
          </td>
          <td className="px-4 py-4 capitalize">
            {item.hotelStay === "no"
              ? "--"
              : new Date(item.checkOutDate).toLocaleDateString()}
          </td>
          <td className="px-4 py-2 max-w-[250px] relative group">
            <p className="truncate overflow-hidden whitespace-nowrap cursor-pointer text-gray-800">
              {item?.remarks ?? "No Remark Added"}
            </p>
            {item?.remarks && (
              <div
                className="absolute left-0 bottom-full mb-1 hidden group-hover:block 
                    bg-gray-800 bg-opacity-95 text-white text-sm p-2 rounded-lg 
                    shadow-lg w-max max-w-[300px] z-50
                    transition-opacity duration-200 opacity-0 group-hover:opacity-100"
              >
                <div className="absolute left-2 bottom-[-6px] w-3 h-3 bg-gray-800 rotate-45"></div>
                {item.remarks}
              </div>
            )}
          </td>
          <td className="px-4 py-4">
            <AppliedFormTravelers item={item?.travelers} />
          </td>
          <td className="px-4 py-4">
            <NavLink
              className="text-blue-600 text-sm underline"
              to={`/pending-requests/${item?._id}`}
            >
              Open Form
            </NavLink>
          </td>
          {user?.user?.role === "hr" && (
            <td className="px-4 py-4">
              <select
                className="bg-white px-2 py-1 rounded-sm shadow-2xl border-2 border-gray-200 outline-none"
                value={selectedVendor}
                name="Vendor"
                id="vendor"
                onChange={handleVendorChange}
              >
                <option value="">Select Vendor</option>
                {vendorsList.map((vendor) => (
                  <option key={vendor._id} value={vendor.email}>
                    {vendor?.fullName.toUpperCase()}
                  </option>
                ))}
              </select>
            </td>
          )}
          {((user?.user?.email === item.reportingManager &&
            !item.isB1Approved &&
            !item.isB1Rejected) ||
            (user?.user?.role === "hr" &&
              item.isB1Approved &&
              !item.isB2Approved &&
              !item.isB2Rejected)) && (
            <>
              <td className="px-4 py-4 text-center">
                <LuCheck
                  size={26}
                  className="font-bold rounded text-green-600 cursor-pointer"
                  onClick={() => handleOpenModal(true)}
                />
              </td>
              <td className="px-4 py-3 text-center">
                <LuX
                  size={26}
                  className="font-bold rounded text-red-600 cursor-pointer"
                  onClick={() => handleOpenModal(false)}
                />
              </td>
              <PendingRequestConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                isApproved={isApproved}
                onConfirm={handleConfirm}
              />
            </>
          )}
          {/* Vendor management includes uploading and viewing tickets, including new tickets.
           */}
          {user?.user?.role === "vendor" && (
            <>
              <td className="px-4 py-4">
                <UploadTicket _id={item?._id} />
              </td>
              <td className="px-4 py-4">
                {" "}
                <ViewTicket _id={item?._id} />
              </td>
              <td className="px-4 py-4">
                <UploadNewTicket _id={item?._id} />
              </td>
              <td className="px-4 py-4">
                {" "}
                <ViewNewTicket _id={item?._id} />
              </td>
            </>
          )}
          {/* status,bookmarks & ticket status */}
          {user?.user?.role === "vendor" && (
            <>
              <td className="px-4 py-4">{item?.status}</td>
              <td className="px-4 py-4">
                <BookMarks item={item} />
              </td>
              <td className="px-4 py-4">
                <TicketStatus
                  _id={item?._id}
                  getBookedStatus={item?.isBooked}
                  fetchPendingRequestData={fetchPendingRequestData}
                />
              </td>
            </>
          )}
        </>
      )}
    </>
  );
}

export default PendingRequestLine;
