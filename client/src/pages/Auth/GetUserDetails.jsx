import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../api/authApi.js";
import Pagination from "../Pagination.jsx";
import DeleteUserDetails from "./DeleteUserDetails.jsx";
import UpdateUserDetails from "./UpdateUserDetails.jsx";

function GetUserDetails() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [searchName, setSearchName] = useState("");

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers();
      setUserData(response?.data?.users);
      setError(null);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const filteredData = userData.filter((user) => {
    const searchTerm = searchName.toLowerCase();
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
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirst, indexOfLast);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getRoleBadge = (role) => {
    const base = "px-3 py-1 text-xs font-medium rounded-full inline-block";
    switch (role?.toLowerCase()) {
      case "user":
        return (
          <span className={`${base} bg-blue-100 text-blue-700`}>User</span>
        );
      case "manager":
        return (
          <span className={`${base} bg-purple-100 text-purple-700`}>
            Manager
          </span>
        );
      case "finance":
        return (
          <span className={`${base} bg-green-100 text-green-700`}>Finance</span>
        );
      case "vendor":
        return (
          <span className={`${base} bg-orange-100 text-orange-700`}>
            Vendor
          </span>
        );
      case "hr":
        return <span className={`${base} bg-pink-100 text-pink-700`}>HR</span>;
      default:
        return (
          <span className={`${base} bg-gray-100 text-gray-700`}>
            {role || "Unknown"}
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
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
      <h2 className="text-lg font-semibold">No Users Found</h2>
      <p className="text-sm text-gray-500 mt-2">
        It seems there are no users available at the moment.
      </p>
    </div>
  );

  return (
    <div className="bg-[#f4f6fb] min-h-screen p-2">
      <div className="bg-white rounded-xl shadow-xs p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              User Management
            </h2>
          </div>
          <div className="relative w-72">
            <input
              type="text"
              placeholder="Search users..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : error ? (
          <p className="text-red-500 text-center py-8">{error}</p>
        ) : filteredData.length === 0 ? (
          <NoDataFound />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[1200px] w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 text-left w-[15%]">User</th>
                  <th className="px-4 py-3 text-left w-[10%]">EMP Code</th>
                  <th className="px-4 py-3 text-left w-[12%]">Designation</th>
                  <th className="px-4 py-3 text-left w-[10%]">Region</th>
                  <th className="px-4 py-3 text-left w-[18%]">Email</th>
                  <th className="px-4 py-3 text-left w-[8%]">Role</th>
                  <th className="px-4 py-3 text-center w-[13%]">Update User</th>
                  <th className="px-4 py-3 text-center w-[14%]">Delete User</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentItems.map((item) => (
                  <tr key={item?._id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-4">
                      <div
                        className="font-medium text-gray-800 truncate"
                        title={item?.fullName}
                      >
                        {item?.fullName}
                      </div>
                    </td>
                    <td
                      className="px-4 py-4 text-gray-700 truncate"
                      title={item?.empCode}
                    >
                      {item?.empCode}
                    </td>
                    <td
                      className="px-4 py-4 text-gray-700 truncate"
                      title={item?.designation}
                    >
                      {item?.designation}
                    </td>
                    <td
                      className="px-4 py-4 text-gray-700 truncate"
                      title={item?.department}
                    >
                      {item?.department}
                    </td>
                    <td
                      className="px-4 py-4 text-gray-700 truncate"
                      title={item?.email}
                    >
                      {item?.email}
                    </td>
                    <td className="px-4 py-4">{getRoleBadge(item?.role)}</td>
                    <td className="px-4 py-4">
                      <div className="flex justify-center">
                        <UpdateUserDetails
                          item={item}
                          setUserData={setUserData}
                        />
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-center">
                        <DeleteUserDetails
                          item={item}
                          setUserData={setUserData}
                        />
                      </div>
                    </td>
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

export default GetUserDetails;
