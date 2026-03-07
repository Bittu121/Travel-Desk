import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getApprovedRequestData } from "../../action/travelPendingApprovalAction.js";
import Pagination from "../Pagination.jsx";
import LoadingSpinner from "../LoadingSpinner.jsx";
import AppliedFormTravelers from "../AppliedForm/AppliedFormTravelers.jsx";
import UpdateFinancePaymentStatus from "./UpdateFinancePaymentStatus.jsx";
import UpdateVendorBookMarkStatus from "./UpdateVendorBookMarkStatus.jsx";
import ViewUploadBillsByVendor from "./ViewUploadBillsByVendor.jsx";
import ViewUploadTicketsByVendor from "./ViewUploadTicketsByVendor.jsx";

function ApprovedRequest() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.travelRequest);
  const { authData: user } = useSelector((state) => state.auth);
  const role = user?.user?.role;
  const canUpload = role === "hr" || role === "finance";
  const canSeeStatus = role === "finance" || role === "hr";

  const [ApprovedRequestData, setApprovedRequestData] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const fetchApprovedRequestsData = async () => {
    try {
      const data = await dispatch(getApprovedRequestData());
      const allApproved = data?.data || [];
      let filtered = [];
      if (user?.user?.role === "manager") {
        filtered = allApproved.filter(
          (item) => item.reportingManager === user?.user?.email,
        );
      } else if (user?.user?.role === "hr") {
        filtered = allApproved;
      } else if (user?.user?.role === "finance") {
        filtered = allApproved;
      }
      setApprovedRequestData(filtered);
    } catch (error) {
      console.error("Error fetching travel requests:", error);
    }
  };

  useEffect(() => {
    fetchApprovedRequestsData();
  }, [dispatch]);

  const filteredData = ApprovedRequestData.filter((item) =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(searchName.toLowerCase()),
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirst, indexOfLast);
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
      <h2 className="text-lg font-semibold">No Approved Form Data Found</h2>
      <p className="text-sm text-gray-500 mt-2">
        It seems there are no Approved Form Data available at the moment.
      </p>
    </div>
  );

  const base =
    "px-3 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1.5 cursor-pointer transition-all duration-200 group relative";

  const tooltipBase =
    "absolute bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs px-2 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50";

  return (
    <>
      <div className="bg-[#f4f6fb] min-h-screen p-2">
        <div className="bg-white rounded-xl shadow-xs p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Travel Approved Requests
              </h2>
            </div>
            <div className="relative w-72">
              <input
                type="text"
                placeholder="Search..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
              />
            </div>
          </div>
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : filteredData.length === 0 ? (
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
                    <th className="px-4 py-3 text-left">Destination Station</th>
                    <th className="px-4 py-3 text-left">Purpose of Travel</th>
                    <th className="px-4 py-3 text-left">Proposed Visit</th>
                    <th className="px-4 py-3 text-left">Mode of Travel</th>
                    <th className="px-4 py-3 text-left">Hotel Stay</th>
                    <th className="px-4 py-3 text-left">Check-in Date</th>
                    <th className="px-4 py-3 text-left">Check-out Date</th>
                    <th className="px-4 py-3 text-left">Remarks</th>
                    <th className="px-4 py-3 text-left">Travelers</th>
                    <th className="px-4 py-3 text-left">Form Data</th>
                    {canUpload && (
                      <>
                        <th className="px-4 py-3 text-left">View Bills</th>
                        <th className="px-4 py-3 text-left">View Tickets</th>
                      </>
                    )}
                    {canSeeStatus && (
                      <>
                        <th className="px-4 py-3 text-left">Payment Status</th>
                        <th className="px-4 py-3 text-left">Vendor Status</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {currentItems.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-4 font-medium text-indigo-600">
                        {item.travelRequestId}
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-medium text-gray-800">
                          {item.name}
                        </div>
                      </td>
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
                      <td className="px-4 py-4">{item.source}</td>
                      <td className="px-4 py-4">{item.destination}</td>
                      <td className="px-4 py-4">{item.purposeOfTravel}</td>
                      <td className="px-4 py-4">{item.proposedVisit}</td>
                      <td className="px-4 py-4 capitalize">
                        {item.travelMode}
                      </td>
                      <td className="px-4 py-4 capitalize">{item.hotelStay}</td>
                      <td className="px-4 py-4">
                        {item.hotelStay === "no" || !item.checkInDate
                          ? "--"
                          : new Date(item.checkInDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4">
                        {item.hotelStay === "no" || !item.checkOutDate
                          ? "--"
                          : new Date(item.checkOutDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4">
                        <div
                          className="max-w-[200px] text-sm text-gray-700 line-clamp-2"
                          title={item?.remarks || "No Remark Added"}
                        >
                          {item?.remarks || "No Remark Added"}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <AppliedFormTravelers item={item?.travelers} />
                      </td>
                      <td className="px-4 py-4">
                        <NavLink
                          to={`/pending-requests/${item?._id}`}
                          className="px-3 py-1 text-xs rounded-lg bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
                        >
                          Open
                        </NavLink>
                      </td>
                      {canUpload && (
                        <>
                          <td className="px-4 py-4">
                            <ViewUploadBillsByVendor item={item?.uploadBill} />
                          </td>
                          <td className="px-4 py-4">
                            <ViewUploadTicketsByVendor
                              item={item?.uploadTicket}
                            />
                          </td>
                        </>
                      )}
                      {canSeeStatus && (
                        <td className="px-4 py-4">
                          <UpdateFinancePaymentStatus item={item} />
                        </td>
                      )}
                      {canSeeStatus && (
                        <td className="px-4 py-4">
                          <UpdateVendorBookMarkStatus item={item} />
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="flex justify-end mt-2">
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={filteredData.length}
              currentPage={currentPage}
              paginate={paginate}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ApprovedRequest;
