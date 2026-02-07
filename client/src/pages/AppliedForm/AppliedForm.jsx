import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Pagination from "../Pagination";
import LoadingSpinner from "../../pages/LoadingSpinner.jsx";
import AppliedFormTravelers from "./AppliedFormTravelers.jsx";
import UploadBills from "../documents/UploadBills.jsx";
import UploadTicket from "../documents/UploadTicket.jsx";

function AppliedForm() {
  const [appliedForm, setAppliedForm] = useState([
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
    },
    {
      _id: "7",
      travelRequestId: "TR-2024-007",
      name: "Rohit Kumar",
      empCode: "EMP1007",
      designation: "DevOps Engineer",
      department: "East Region",
      dateOfRequest: "2024-01-25",
      travelDate: "2024-01-30",
      returnDate: "2024-02-01",
      source: "Kolkata",
      destination: "Delhi",
      purposeOfTravel: "Infrastructure Setup",
      proposedVisit: "Data Center",
      travelMode: "air",
      hotelStay: "yes",
      checkInDate: "2024-01-30",
      checkOutDate: "2024-02-01",
      remarks: "Server deployment",
      travelers: [{ name: "Rohit Kumar", age: 30, gender: "male" }],
    },
    {
      _id: "8",
      travelRequestId: "TR-2024-008",
      name: "Sneha Iyer",
      empCode: "EMP1008",
      designation: "UI/UX Designer",
      department: "South Region",
      dateOfRequest: "2024-01-28",
      travelDate: "2024-02-02",
      returnDate: "2024-02-03",
      source: "Chennai",
      destination: "Bangalore",
      purposeOfTravel: "Design Workshop",
      proposedVisit: "Product Team",
      travelMode: "cab",
      hotelStay: "no",
      checkInDate: "",
      checkOutDate: "",
      remarks: "UX brainstorming",
      travelers: [{ name: "Sneha Iyer", age: 27, gender: "female" }],
    },
    {
      _id: "9",
      travelRequestId: "TR-2024-009",
      name: "Arjun Patel",
      empCode: "EMP1009",
      designation: "Sales Manager",
      department: "West Region",
      dateOfRequest: "2024-02-01",
      travelDate: "2024-02-06",
      returnDate: "2024-02-08",
      source: "Surat",
      destination: "Mumbai",
      purposeOfTravel: "Sales Pitch",
      proposedVisit: "Enterprise Client",
      travelMode: "train",
      hotelStay: "yes",
      checkInDate: "2024-02-06",
      checkOutDate: "2024-02-08",
      remarks: "High priority client",
      travelers: [{ name: "Arjun Patel", age: 38, gender: "male" }],
    },
    {
      _id: "10",
      travelRequestId: "TR-2024-010",
      name: "Pooja Nair",
      empCode: "EMP1010",
      designation: "QA Lead",
      department: "South Region",
      dateOfRequest: "2024-02-03",
      travelDate: "2024-02-09",
      returnDate: "2024-02-11",
      source: "Kochi",
      destination: "Trivandrum",
      purposeOfTravel: "Release Validation",
      proposedVisit: "QA Lab",
      travelMode: "bus",
      hotelStay: "no",
      checkInDate: "",
      checkOutDate: "",
      remarks: "",
      travelers: [{ name: "Pooja Nair", age: 33, gender: "female" }],
    },
    {
      _id: "11",
      travelRequestId: "TR-2024-011",
      name: "Karan Malhotra",
      empCode: "EMP1011",
      designation: "Product Owner",
      department: "Central Region",
      dateOfRequest: "2024-02-05",
      travelDate: "2024-02-12",
      returnDate: "2024-02-15",
      source: "Nagpur",
      destination: "Delhi",
      purposeOfTravel: "Roadmap Planning",
      proposedVisit: "Leadership Team",
      travelMode: "air",
      hotelStay: "yes",
      checkInDate: "2024-02-12",
      checkOutDate: "2024-02-15",
      remarks: "Quarter planning meet",
      travelers: [{ name: "Karan Malhotra", age: 41, gender: "male" }],
    },
  ]);

  const { authData: user } = useSelector((state) => state.auth);

  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  
  const tableHeader = [
    "Travel Id",
    "Employee",
    "EMP Code",
    "Designation",
    "Region",
    "Date of Request",
    "Date of Travel",
    "Date of Return",
    "Source Station",
    "Destination Station",
    "Purpose of Travel",
    "Proposed Customer Visit",
    "Mode of Travel",
    "Hotel Stay",
    "Check-in Date",
    "Check-out Date",
    "Remarks",
    "Travelers",
    "Form Data",
    ...(user?.user?.role === "user" || user?.user?.role === "manager"
      ? ["View Bills", "View Tickets"]
      : []),

    ...(user?.user?.role === "user" ||
    user?.user?.role === "manager" ||
    user?.user?.role === "hr"
      ? ["Status"]
      : []),
  ];

  const getIsBookedStatus = (item) => {
    console.log(item); //later change
  };

  const filteredData = appliedForm.filter((item) => {
    const searchTerm = searchName.toLowerCase().trim();
    const searchableItem = {
      ...item,
      dateOfRequest: new Date(item.dateOfRequest).toLocaleDateString(),
      travelDate: new Date(item.travelDate).toLocaleDateString(),
      returnDate: new Date(item.returnDate).toLocaleDateString(),
      checkInDate: new Date(item.checkInDate).toLocaleDateString(),
      checkOutDate: new Date(item.checkOutDate).toLocaleDateString(),
    };
    return Object.values(searchableItem)
      .map((val) => val?.toString().toLowerCase() || "")
      .some((val) => val.includes(searchTerm));
  });

  //pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const tableRows = () => {
    return currentItems.map((item) => (
      <tr
        key={item?._id}
        className="border-b border-gray-100 hover:bg-gray-50 transition"
      >
        <td className="px-4 py-4 text-center text-gray-900">
          {item.travelRequestId}
        </td>
        <td className="px-4 py-3 text-center text-gray-900">{item.name}</td>
        <td className="px-4 py-3 text-center text-gray-900">{item.empCode}</td>
        <td className="px-4 py-3 text-center text-gray-900">
          {item.designation}
        </td>
        <td className="px-4 py-3 text-center text-gray-900">
          {item.department}
        </td>
        <td className="px-4 py-3 text-center text-gray-900">
          {new Date(item.dateOfRequest).toLocaleDateString()}
        </td>
        <td className="px-4 py-3 text-center text-gray-900">
          {new Date(item.travelDate).toLocaleDateString()}
        </td>
        <td className="px-4 py-3 text-center text-gray-900">
          {new Date(item.returnDate).toLocaleDateString()}
        </td>
        <td className="px-4 py-3 text-center text-gray-900">{item.source}</td>
        <td className="px-4 py-3 text-center text-gray-900">
          {item.destination}
        </td>
        <td className="px-4 py-3 text-center text-gray-900">
          {item.purposeOfTravel}
        </td>
        <td className="px-4 py-3 text-center text-gray-900">
          {item.proposedVisit}
        </td>
        <td className="px-4 py-3 text-center text-gray-900">
          {item.travelMode}
        </td>
        <td className="px-4 py-3 text-center capitalize text-gray-900">
          {item.hotelStay}
        </td>
        <td className="px-4 py-3 text-center capitalize text-gray-900">
          {item.hotelStay === "no"
            ? "--"
            : new Date(item.checkInDate).toLocaleDateString()}
        </td>
        <td className="px-4 py-3 text-center capitalize text-gray-900">
          {item.hotelStay === "no"
            ? "--"
            : new Date(item.checkOutDate).toLocaleDateString()}
        </td>
        <td className="px-4 py-3 text-center text-gray-900">
          <div
            className="max-w-[180px] mx-auto text-sm text-gray-700
               line-clamp-2 break-words"
            title={item?.remarks || "No Remark Added"}
          >
            {item?.remarks || "No Remark Added"}
          </div>
        </td>
        <td className="px-4 py-3 text-center text-gray-900">
          {<AppliedFormTravelers item={item.travelers} id={item._id} />}
        </td>{" "}
        <td className="px-4 py-3 text-center text-gray-900">
          <NavLink
            className="text-blue-600 text-sm underline"
            // to={`/travel-requests/${item._id}`}
          >
            Open Form
          </NavLink>
        </td>
        {user?.user?.role === "user" || user?.user?.role === "manager" ? (
          <td className="px-4 py-3 text-center capitalize text-gray-900">
            <UploadBills item={item?.uploadBill} />
          </td>
        ) : (
          ""
        )}
        {user?.user?.role === "user" || user?.user?.role === "manager" ? (
          <td className="px-4 py-3 text-center capitalize text-gray-900">
            <UploadTicket item={item?.uploadTicket} />
          </td>
        ) : (
          ""
        )}
        {(user?.user?.role === "user" ||
          user?.user?.role === "manager" ||
          user?.user?.role === "hr") && (
          <td className="px-4 py-3 text-center text-gray-900">
            {getIsBookedStatus(item)}
          </td>
        )}
      </tr>
    ));
  };

  const loading = false;
  const error = false;
  return (
    <>
      <div className="table_component p-2">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <p className="text-center mt-5 text-red-500">Error: {error}</p>
        ) : filteredData.length === 0 ? (
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
            <h2 className="text-lg font-semibold">
              No Applied Form Data Found
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              It seems there are no Applied Form Data available at the moment.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="relative w-full max-w-sm">
                {/* Search Icon */}
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35m1.6-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                {/* Input */}
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 shadow-xs outline-none transition"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <div className="max-h-[420px] overflow-y-auto">
                <table className="min-w-[3300px] w-full border-collapse text-sm">
                  <thead className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200">
                    <tr className="text-center text-sm">
                      {tableHeader.map((headerData, index) => (
                        <th
                          key={index}
                          className="px-4 py-4 text-left font-medium text-gray-600 uppercase tracking-wide"
                        >
                          {headerData}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>{tableRows()}</tbody>
                </table>
              </div>
            </div>
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={filteredData.length}
              currentPage={currentPage}
              paginate={paginate}
            />
          </>
        )}
      </div>
    </>
  );
}

export default AppliedForm;
