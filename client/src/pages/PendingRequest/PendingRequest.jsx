import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PendingRequestLine from "./PendingRequestLine.jsx";
import { RiFileExcel2Line } from "react-icons/ri";
import * as XLSX from "xlsx";
import { Pagination } from "@mui/material";
import LoadingSpinner from "../LoadingSpinner.jsx";
import { getAllTravelRequestsByRole } from "../../action/travelPendingApprovalAction.js";
import { BiExport } from "react-icons/bi";

function PendingRequest() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.travelRequest);
  const { authData: user } = useSelector((state) => state.auth);
  const isVendorUser = user?.user?.role === "vendor";
  const isHrUser = user?.user?.role === "hr";

  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [travelRejected, setTravelRejected] = useState(false);
  const [vendor, setVendor] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const unbookedData = data.filter((item) => item.isBooked === false);
  const isSelectedVendor = data.filter(
    (item) => item.vendors === user.user.email,
  );
  const managerApproved = data.filter((item) => item.isB1Approved === false);
  const hrApproved = data.filter((item) => item.isB2Approved === false);

  const fetchPendingRequestData = async () => {
    try {
      const response = await dispatch(getAllTravelRequestsByRole());
      setData(response?.data || []);
    } catch (error) {
      console.error("Error fetching travel requests:", error);
    }
  };

  useEffect(() => {
    fetchPendingRequestData();
  }, []);

  const travelRequestUpdate = async (request) => {
    const updatedItem = { ...request };
    if (update && !travelRejected) {
      if (user?.user?.email === request.reportingManager) {
        updatedItem.isB1Approved = true;
        updatedItem.isB1Rejected = false;
      } else if (isHrUser) {
        updatedItem.isB2Approved = true;
        updatedItem.isB2Rejected = false;
        updatedItem.vendors = vendor;
      }
    } else if (!update && travelRejected) {
      if (user?.user?.email === request.reportingManager) {
        updatedItem.isB1Approved = false;
        updatedItem.isB1Rejected = true;
      } else if (isHrUser) {
        updatedItem.isB2Approved = false;
        updatedItem.isB2Rejected = true;
        updatedItem.vendors = vendor;
      }
    }
    try {
      //Api Call
      // await dispatch(updateTravelRequestById(updatedItem?._id, updatedItem));
      await fetchPendingRequestData();
    } catch (error) {
      console.error("Error updating travel request:", error);
    }
  };

  const exportToExcel = () => {
    if (filteredData.length === 0) {
      alert("No unbooked travel requests available to export.");
      return;
    }

    const fieldsToRemove = [
      "isB1Approved",
      "isB1Rejected",
      "isB2Approved",
      "isB2Rejected",
      "isB3Approved",
      "isB3Rejected",
      "_id",
      "uploadTicket",
      "uploadBill",
      "createdAt",
      "updatedAt",
      "__v",
    ];

    const cleanedData = filteredData.map((item) => {
      const newItem = { ...item };
      fieldsToRemove.forEach((field) => delete newItem[field]);
      return newItem;
    });

    const worksheet = XLSX.utils.json_to_sheet(cleanedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "UnbookedTravelRequests");
    XLSX.writeFile(workbook, "UnbookedTravelRequests.xlsx");
  };

  const formatDatesInItem = (item) => ({
    ...item,
    dateOfRequest: new Date(item.dateOfRequest).toLocaleDateString(),
    travelDate: new Date(item.travelDate).toLocaleDateString(),
    returnDate: new Date(item.returnDate).toLocaleDateString(),
    checkInDate: new Date(item.checkInDate).toLocaleDateString(),
    checkOutDate: new Date(item.checkOutDate).toLocaleDateString(),
  });

  const filteredData = useMemo(() => {
    const term = searchName.toLowerCase().trim();
    const filterBySearch = (items) =>
      items.filter((item) => {
        const searchableItem = formatDatesInItem(item);
        return Object.values(searchableItem)
          .map((val) => val?.toString().toLowerCase() || "")
          .some((val) => val.includes(term));
      });
    if (isVendorUser) return filterBySearch(unbookedData && isSelectedVendor);
    if (user?.user?.role === "manager") return filterBySearch(managerApproved);
    if (isHrUser) return filterBySearch(hrApproved);

    return [];
  }, [data, searchName, unbookedData, managerApproved, hrApproved]);

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredData.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredData, currentPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const NoDataFound = () => (
    <div className="flex flex-col items-center justify-center h-64 text-gray-600">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 text-gray-400 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 17v-2a4 4 0 014-4h2a4 4 0 014 4v2m-6 4h.01M4 4h16M4 8h16M4 12h16M4 16h16"
        />
      </svg>
      <h2 className="text-lg font-semibold">No Travel Requests Found</h2>
      <p className="text-sm text-gray-500 mt-2">
        It seems there are no travel requests available at the moment.
      </p>
    </div>
  );

  return (
    <>
      <div className="bg-[#f4f6fb] min-h-screen p-2">
        <div className="bg-white rounded-xl shadow-xs p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Pending Requests
              </h2>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <input
                type="text"
                placeholder="Search..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
              />
              <button
                onClick={exportToExcel}
                title="Export to Excel"
                className="flex items-center cursor-pointer justify-center gap-2 h-10 px-4 bg-emerald-600 text-white rounded-lg 
               hover:bg-emerald-700 
               transition"
              >
                <BiExport size={18} />
                <RiFileExcel2Line size={18} />
              </button>
            </div>
          </div>
          <div>
            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (user.user.role === "manager" &&
                managerApproved.length === 0) ||
              (isHrUser && hrApproved.length === 0) ||
              (isVendorUser && unbookedData.length === 0) ||
              (isVendorUser && isSelectedVendor.length === 0) ? (
              <NoDataFound />
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-[3300px] w-full text-sm">
                  <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                    <tr>
                      <th className="px-4 py-3 text-left">Travel ID</th>
                      <th className="px-4 py-3 text-left">Employee</th>
                      <th className="px-4 py-3 text-left">EMP Code</th>
                      <th className="px-4 py-3 text-left">Designation</th>
                      <th className="px-4 py-3 text-left">Region</th>
                      <th className="px-4 py-3 text-left">Date of Request</th>
                      <th className="px-4 py-3 text-left">Date of Travel</th>
                      <th className="px-4 py-3 text-left">Date of Return</th>
                      <th className="px-4 py-3 text-left">Source Station</th>
                      <th className="px-4 py-3 text-left">
                        Destination Station
                      </th>
                      <th className="px-4 py-3 text-left">Purpose of Travel</th>
                      <th className="px-4 py-3 text-left">Proposed Visit</th>
                      <th className="px-4 py-3 text-left">Mode of Travel</th>
                      <th className="px-4 py-3 text-left">Hotel Stay</th>
                      <th className="px-4 py-3 text-left">Check-in Date</th>
                      <th className="px-4 py-3 text-left">Check-out Date</th>
                      <th className="px-4 py-3 text-left">Remarks</th>
                      <th className="px-4 py-3 text-left">Travelers</th>
                      <th className="px-4 py-3 text-left">Form Data</th>
                      {isHrUser && (
                        <>
                          <th className="px-4 py-3 text-left">Select Vendor</th>
                        </>
                      )}
                      {isVendorUser ? (
                        <>
                          <th className="px-4 py-3 text-left">Upload Bills</th>
                          <th className="px-4 py-3 text-left">View Bills</th>
                          <th className="px-4 py-3 text-left">Upload Ticket</th>
                          <th className="px-4 py-3 text-left">View Tickets</th>
                        </>
                      ) : (
                        <>
                          <th className="px-4 py-3 text-left">Accept</th>
                          <th className="px-4 py-3 text-left">Reject</th>
                        </>
                      )}
                      {isVendorUser && (
                        <>
                          <th className="px-4 py-3 text-left">
                            Payment Status
                          </th>
                          <th className="px-4 py-3 text-left">Vendor Status</th>
                          <th className="px-4 py-3 text-left">Ticket Status</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {currentItems.map((item) => {
                      const isManager =
                        user?.user?.email === item.reportingManager;
                      const shouldRender =
                        (isManager &&
                          !item.isB1Approved &&
                          !item.isB1Rejected) ||
                        (isHrUser && item.isB1Approved && !item.isB2Approved) ||
                        (isVendorUser && item.isB2Approved);
                      return shouldRender ? (
                        <>
                          <tr
                            key={item?._id}
                            className="border-b hover:bg-gray-50"
                          >
                            <PendingRequestLine
                              item={item}
                              _id={item?._id}
                              travelRequestUpdate={() =>
                                travelRequestUpdate(item)
                              }
                              setUpdate={setUpdate}
                              setTravelRejected={setTravelRejected}
                              setVendor={setVendor}
                              fetchPendingRequestData={fetchPendingRequestData}
                            />
                          </tr>
                        </>
                      ) : null;
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PendingRequest;
