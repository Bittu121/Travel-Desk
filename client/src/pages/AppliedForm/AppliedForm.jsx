import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Pagination from "../Pagination";
import LoadingSpinner from "../../pages/LoadingSpinner.jsx";
import AppliedFormTravelers from "./AppliedFormTravelers.jsx";
import UploadBills from "../documents/UploadBills.jsx";
import UploadTicket from "../documents/UploadTicket.jsx";

function AppliedForm() {
  const { authData: user } = useSelector((state) => state.auth);
  const role = user?.user?.role;

  const canUpload = role === "user" || role === "manager";
  const canSeeStatus = role === "user" || role === "manager" || role === "hr";
  const { loading, error } = useSelector((state) => state.travelRequest);

  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [appliedForm] = useState([
    {
      _id: "1",
      travelRequestId: "TR-2024-001",
      name: "Amit Sharma",
      empCode: "EMP1001",
      designation: "Software Engineer",
      department: "North Region",
      dateOfRequest: "2024-01-05",
      travelDate: "2024-01-10",
      returnDate: "2024-01-12",
      source: "Delhi",
      destination: "Bangalore",
      purposeOfTravel: "Client Meeting",
      proposedVisit: "ABC Technologies",
      travelMode: "air",
      hotelStay: "yes",
      checkInDate: "2024-01-10",
      checkOutDate: "2024-01-12",
      remarks: "Initial client discussion Initial client discussion",
      travelers: [{ name: "Amit Sharma", age: 28, gender: "male" }],
      status: "Approved",
    },
    {
      _id: "2",
      travelRequestId: "TR-2024-002",
      name: "Priya Verma",
      empCode: "EMP1002",
      designation: "Project Manager",
      department: "West Region",
      dateOfRequest: "2024-01-08",
      travelDate: "2024-01-14",
      returnDate: "2024-01-14",
      source: "Mumbai",
      destination: "Pune",
      purposeOfTravel: "Project Review",
      proposedVisit: "Internal Office",
      travelMode: "cab",
      hotelStay: "no",
      checkInDate: "",
      checkOutDate: "",
      remarks: "One day review One day review",
      travelers: [{ name: "Priya Verma", age: 34, gender: "female" }],
      status: "Pending",
    },
    {
      _id: "3",
      travelRequestId: "TR-2024-003",
      name: "Rahul Singh",
      empCode: "EMP1003",
      designation: "Senior Analyst",
      department: "South Region",
      dateOfRequest: "2024-01-12",
      travelDate: "2024-01-18",
      returnDate: "2024-01-22",
      source: "Hyderabad",
      destination: "Chennai",
      purposeOfTravel: "Audit Support",
      proposedVisit: "Finance Department",
      travelMode: "train",
      hotelStay: "yes",
      checkInDate: "2024-01-18",
      checkOutDate: "2024-01-22",
      remarks: "One day review One day review",
      travelers: [
        { name: "Rahul Singh", age: 31, gender: "male" },
        { name: "Suresh Kumar", age: 35, gender: "male" },
      ],
      status: "Approved",
    },
    {
      _id: "4",
      travelRequestId: "TR-2024-004",
      name: "Neha Gupta",
      empCode: "EMP1004",
      designation: "HR Executive",
      department: "Central Region",
      dateOfRequest: "2024-01-15",
      travelDate: "2024-01-20",
      returnDate: "2024-01-21",
      source: "Bhopal",
      destination: "Indore",
      purposeOfTravel: "Hiring Drive",
      proposedVisit: "Campus Visit",
      travelMode: "bus",
      hotelStay: "no",
      checkInDate: "",
      checkOutDate: "",
      remarks: "Campus recruitment One day review",
      travelers: [{ name: "Neha Gupta", age: 29, gender: "female" }],
      status: "Rejected",
    },
    {
      _id: "5",
      travelRequestId: "TR-2024-005",
      name: "Vikram Joshi",
      empCode: "EMP1005",
      designation: "Tech Lead",
      department: "North Region",
      dateOfRequest: "2024-01-18",
      travelDate: "2024-01-25",
      returnDate: "2024-01-28",
      source: "Noida",
      destination: "Pune",
      purposeOfTravel: "Architecture Review",
      proposedVisit: "Client Engineering Team",
      travelMode: "air",
      hotelStay: "yes",
      checkInDate: "2024-01-25",
      checkOutDate: "2024-01-28",
      remarks: "System design discussion One day review",
      travelers: [{ name: "Vikram Joshi", age: 36, gender: "male" }],
      status: "Pending",
    },
    {
      _id: "6",
      travelRequestId: "TR-2024-006",
      name: "Anjali Mehta",
      empCode: "EMP1006",
      designation: "Business Analyst",
      department: "West Region",
      dateOfRequest: "2024-01-22",
      travelDate: "2024-01-27",
      returnDate: "2024-01-29",
      source: "Ahmedabad",
      destination: "Jaipur",
      purposeOfTravel: "Requirement Gathering",
      proposedVisit: "Client Operations",
      travelMode: "train",
      hotelStay: "yes",
      checkInDate: "2024-01-27",
      checkOutDate: "2024-01-29",
      remarks: "",
      travelers: [{ name: "Anjali Mehta", age: 32, gender: "female" }],
      status: "Approved",
    },
  ]);

  const filteredData = appliedForm.filter((item) =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(searchName.toLowerCase()),
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirst, indexOfLast);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getStatusBadge = (status) => {
    const base = "px-3 py-1 text-xs font-medium rounded-full inline-block";
    switch (status) {
      case "Approved":
        return (
          <span className={`${base} bg-green-100 text-green-600`}>
            Approved
          </span>
        );
      case "Pending":
        return (
          <span className={`${base} bg-yellow-100 text-yellow-600`}>
            Pending
          </span>
        );
      case "Rejected":
        return (
          <span className={`${base} bg-red-100 text-red-600`}>Rejected</span>
        );
      default:
        return (
          <span className={`${base} bg-gray-100 text-gray-600`}>
            {status || "Pending"}
          </span>
        );
    }
  };

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
      <h2 className="text-lg font-semibold">No Applied Form Data Found</h2>
      <p className="text-sm text-gray-500 mt-2">
        It seems there are no Applied Form Data available at the moment.
      </p>
    </div>
  );

  return (
    <div className="bg-[#f4f6fb] min-h-screen p-2">
      <div className="bg-white rounded-xl shadow-xs p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Travel Requests
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
            <table className="min-w-[3200px] w-full text-sm">
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
                    <th className="px-4 py-3 text-left">Status</th>
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
                    <td className="px-4 py-4 capitalize">{item.travelMode}</td>
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
                      <AppliedFormTravelers
                        item={item.travelers}
                        id={item._id}
                      />
                    </td>
                    <td className="px-4 py-4">
                      <NavLink
                        to={`/travel-requests/${item._id}`}
                        className="px-3 py-1 text-xs rounded-lg bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
                      >
                        Open
                      </NavLink>
                    </td>
                    {canUpload && (
                      <>
                        <td className="px-4 py-4">
                          <UploadBills item={item?.uploadBill} />
                        </td>
                        <td className="px-4 py-4">
                          <UploadTicket item={item?.uploadTicket} />
                        </td>
                      </>
                    )}
                    {canSeeStatus && (
                      <td className="px-4 py-4">
                        {getStatusBadge(item.status)}
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
  );
}
export default AppliedForm;
