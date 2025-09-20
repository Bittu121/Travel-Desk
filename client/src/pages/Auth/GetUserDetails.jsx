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
    indexOfLastItem
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
      <tr key={item?._id} className="border-b hover:bg-gray-50">
        <td className="px-4 py-3 text-center">{item?.fullName}</td>
        <td className="px-4 py-3 text-center">{item?.empCode}</td>
        <td className="px-4 py-3 text-center">{item?.designation}</td>
        <td className="px-4 py-3 text-center">{item?.department}</td>
        <td className="px-4 py-3 text-center">{item?.email}</td>
        <td className="px-4 py-3 text-center">{item?.role}</td>
        <td className="px-4 py-3 text-center">
          <div className="flex justify-center">
            <UpdateUserDetails item={item} />
          </div>
        </td>
        <td className="px-4 py-3 text-center">
          <div className="flex justify-center">
            <DeleteUserDetails item={item} />
          </div>
        </td>
      </tr>
    ));
  };
  return (
    <>
      <div className="table_component p-2">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-xs px-4 py-2 border rounded-md outline-none"
          />
        </div>
        <div className="overflow-x-auto">
          <div className="max-w-screen overflow-y-auto max-h-[380px] min-2xl:max-h-[500px]">
            <table className="mt-5 min-w-[2200px] table-auto border-collapse">
              <thead>
                <tr className="text-center text-base">
                  {tableHeader.map((headerData, index) => (
                    <th
                      className="px-4 py-3 bg-gray-500 text-white font-bold"
                      key={index}
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
