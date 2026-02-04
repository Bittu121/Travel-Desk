import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../api/authApi.js";
import Pagination from "../Pagination.jsx";
import DeleteUserDetails from "./DeleteUserDetails.jsx";
import UpdateUserDetails from "./UpdateUserDetails.jsx";

function GetUserDetails() {
  const [userData, setUserData] = useState([]);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  //Search
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUserData = async () => {
    try {
      const response = await getAllUsers();
      setUserData(response?.data?.users);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  //search
  const filteredUserData = userData.filter((user) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      user.fullName?.toLowerCase().includes(searchTerm) ||
      user.empCode?.toLowerCase().includes(searchTerm) ||
      user.designation?.toLowerCase().includes(searchTerm) ||
      user.department?.toLowerCase().includes(searchTerm) ||
      user.email?.toLowerCase().includes(searchTerm) ||
      user.role?.toLowerCase().includes(searchTerm)
    );
  });

  //pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUserData.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const tableHeader = [
    "User",
    "EMP Code",
    "Designation",
    "Region",
    "Email",
    "Role",
    "Update User",
    "Delete User",
  ];
  const tableRows = () => {
    return currentItems.map((item) => (
      <tr
        key={item?._id}
        className="border-b border-gray-100 hover:bg-gray-50 transition"
      >
        <td className="px-4 py-3 text-gray-900">{item?.fullName}</td>
        <td className="px-4 py-3 text-gray-700">{item?.empCode}</td>
        <td className="px-4 py-3 text-gray-700">{item?.designation}</td>
        <td className="px-4 py-3 text-gray-700">{item?.department}</td>
        <td className="px-4 py-3 text-gray-700">{item?.email}</td>
        <td className="px-4 py-3">
          <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 font-medium text-gray-700">
            {item?.role}
          </span>
        </td>
        <td className="px-4 py-3">
          <UpdateUserDetails item={item} setUserData={setUserData} />
        </td>
        <td className="px-4 py-3">
          <DeleteUserDetails item={item} setUserData={setUserData} />
        </td>
      </tr>
    ));
  };
  return (
    <>
      <div className="table_component p-2">
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
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 shadow-xs
        outline-none
        transition
      "
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="max-h-[420px] overflow-y-auto">
            <table className="min-w-[1400px] w-full border-collapse text-sm">
              <thead className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200">
                <tr>
                  {tableHeader.map((headerData, index) => (
                    <th
                      key={index}
                      className="px-4 py-3 text-left font-medium text-gray-600 uppercase tracking-wide"
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
          totalItems={filteredUserData.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </>
  );
}

export default GetUserDetails;
