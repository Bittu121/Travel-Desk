import React from "react";
import { useSelector } from "react-redux";
import { FiMenu, FiX } from "react-icons/fi";
import {
  MdAssignment,
  MdDashboard,
  MdManageAccounts,
  MdOutlineDescription,
  MdOutlineFlightTakeoff,
  MdPersonAddAlt,
  MdTaskAlt,
} from "react-icons/md";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { authData: user } = useSelector((state) => state.auth);
  const isTravelRequestAndAppliedForm =
    user?.user?.role === "user" ||
    user?.user?.role === "manager" ||
    user?.user?.role === "hr";
  const isCreateAndUpdateUser = user?.user?.role === "hr";
  const isTravelRequestApproval =
    user?.user?.role === "manager" ||
    user?.user?.role === "hr" ||
    user?.user?.role === "vendor";
  const isApprovedRequest =
    user?.user?.role === "manager" ||
    user?.user?.role === "hr" ||
    user?.user?.role === "finance";
  return (
    <>
      <div>
        <div
          className={`hidden md:flex flex-col h-screen bg-white transition-width duration-300 ${
            isOpen ? "w-16" : "w-64"
          }`}
        >
          <div className="flex items-center justify-between px-4 py-6 border-b border-gray-300">
            <h2
              className={` ${
                isOpen ? "hidden" : "block"
              } text-xl font-bold text-gray-600`}
            >
              Travel Desk
            </h2>
            <button
              onClick={toggleSidebar}
              className="text-xl text-gray-600 cursor-pointer"
            >
              <FiMenu size={24} />
            </button>
          </div>
          <nav>
            {isCreateAndUpdateUser && (
              <NavLink
                to="/dashboard"
                // className="flex items-center gap-4 p-4 text-gray-500"
                // style={(e) => {
                //   return {
                //     color: e.isActive ? "blue" : "black",
                //     fontWeight: e.isActive ? "bold" : "normal",
                //   };
                // }}
                className={({ isActive }) =>
                  `flex items-center gap-4 p-4 mx-2 my-1 rounded-lg transition-all duration-200
     ${isActive ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-600"}
     hover:bg-gray-100`
                }
              >
                <MdDashboard className="text-xl" size={22} />
                <span className={`${isOpen ? "hidden" : "block"}`}>
                  Dashboard
                </span>
              </NavLink>
            )}

            {isTravelRequestAndAppliedForm && (
              <NavLink
                to="/travel-request-form"
                className={({ isActive }) =>
                  `flex items-center gap-4 p-4 mx-2 my-1 rounded-lg transition-all duration-200
     ${isActive ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-600"}
     hover:bg-gray-100`
                }
              >
                <MdOutlineFlightTakeoff className="text-xl" size={22} />
                <span className={`${isOpen ? "hidden" : "block"}`}>
                  Travel Request Form
                </span>
              </NavLink>
            )}
            {isTravelRequestAndAppliedForm && (
              <NavLink
                to="/applied-form"
                className={({ isActive }) =>
                  `flex items-center gap-4 p-4 mx-2 my-1 rounded-lg transition-all duration-200
     ${isActive ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-600"}
     hover:bg-gray-100`
                }
              >
                <MdOutlineDescription className="text-xl" size={22} />
                <span className={`${isOpen ? "hidden" : "block"}`}>
                  Applied Form
                </span>
              </NavLink>
            )}
            {isCreateAndUpdateUser && (
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `flex items-center gap-4 p-4 mx-2 my-1 rounded-lg transition-all duration-200
     ${isActive ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-600"}
     hover:bg-gray-100`
                }
              >
                <MdPersonAddAlt className="text-xl" size={22} />
                <span className={`${isOpen ? "hidden" : "block"}`}>
                  Create User
                </span>
              </NavLink>
            )}
            {isCreateAndUpdateUser && (
              <NavLink
                to="/update-user"
                className={({ isActive }) =>
                  `flex items-center gap-4 p-4 mx-2 my-1 rounded-lg transition-all duration-200
     ${isActive ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-600"}
     hover:bg-gray-100`
                }
              >
                <MdManageAccounts className="text-xl" size={22} />
                <span className={`${isOpen ? "hidden" : "block"}`}>
                  Update User
                </span>
              </NavLink>
            )}
            {isTravelRequestApproval && (
              <NavLink
                to="/pending-requests"
                className={({ isActive }) =>
                  `flex items-center gap-4 p-4 mx-2 my-1 rounded-lg transition-all duration-200
     ${isActive ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-600"}
     hover:bg-gray-100`
                }
              >
                <MdAssignment className="text-xl" size={24} />
                <span className={`${isOpen ? "hidden" : "block"}`}>
                  Pending Requests
                </span>
              </NavLink>
            )}
            {isApprovedRequest && (
              <NavLink
                to="/approved-requests"
                className={({ isActive }) =>
                  `flex items-center gap-4 p-4 mx-2 my-1 rounded-lg transition-all duration-200
     ${isActive ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-600"}
     hover:bg-gray-100`
                }
              >
                <MdTaskAlt className="text-xl" size={24} />
                <span className={`${isOpen ? "hidden" : "block"}`}>
                  Approved Requests
                </span>
              </NavLink>
            )}
          </nav>
        </div>
        {/* Mobile Sidebar */}
        <div
          className={`fixed top-0 left-0 z-40 bg-white h-screen w-64 transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden`}
        >
          <div className="flex items-center justify-between p-4">
            <h1 className="font-bold text-xl text-gray-800">Travel Desk</h1>
            <button
              onClick={toggleSidebar}
              className="text-xl text-gray-600 cursor-pointer"
            >
              <FiX size={24} />
            </button>
          </div>
          {isCreateAndUpdateUser && (
            <NavLink
              to="/dashboard"
              className="flex items-center gap-4 p-4 text-gray-500"
              style={(e) => {
                return {
                  color: e.isActive ? "blue" : "black",
                  fontWeight: e.isActive ? "bold" : "normal",
                };
              }}
            >
              <MdDashboard className="text-xl" size={24} />
              <span>Dashboard</span>
            </NavLink>
          )}

          {isTravelRequestAndAppliedForm && (
            <NavLink
              to="/travel-request-form"
              className="flex items-center gap-4 p-4 text-gray-500"
              style={(e) => {
                return {
                  color: e.isActive ? "blue" : "black",
                  fontWeight: e.isActive ? "bold" : "normal",
                };
              }}
            >
              <MdOutlineFlightTakeoff className="text-xl" size={24} />
              <span>Travel Request Form</span>
            </NavLink>
          )}
          {isTravelRequestAndAppliedForm && (
            <NavLink
              to="/applied-form"
              className="flex items-center gap-4 p-4 text-gray-500"
              style={(e) => {
                return {
                  color: e.isActive ? "blue" : "black",
                  fontWeight: e.isActive ? "bold" : "normal",
                };
              }}
            >
              <MdOutlineDescription className="text-xl" size={24} />
              <span>Applied Form</span>
            </NavLink>
          )}
          {isCreateAndUpdateUser && (
            <NavLink
              to="/signup"
              className="flex items-center gap-4 p-4 text-gray-500"
              style={(e) => {
                return {
                  color: e.isActive ? "blue" : "black",
                  fontWeight: e.isActive ? "bold" : "normal",
                };
              }}
            >
              <MdPersonAddAlt className="text-xl" size={24} />
              <span>Create User</span>
            </NavLink>
          )}
          {isCreateAndUpdateUser && (
            <NavLink
              to="/update-user"
              className="flex items-center gap-4 p-4 text-gray-500"
              style={(e) => {
                return {
                  color: e.isActive ? "blue" : "black",
                  fontWeight: e.isActive ? "bold" : "normal",
                };
              }}
            >
              <MdManageAccounts className="text-xl" size={24} />
              <span>Update User</span>
            </NavLink>
          )}
          {isTravelRequestApproval && (
            <NavLink
              to="/pending-requests"
              className="flex items-center gap-4 p-4 text-gray-500"
              style={(e) => {
                return {
                  color: e.isActive ? "blue" : "black",
                  fontWeight: e.isActive ? "bold" : "normal",
                };
              }}
            >
              <MdAssignment className="text-xl" size={24} />
              <span>Pending Requests</span>
            </NavLink>
          )}
          {isApprovedRequest && (
            <NavLink
              to="/approved-requests"
              className="flex items-center gap-4 p-4 text-gray-500"
              style={(e) => {
                return {
                  color: e.isActive ? "blue" : "black",
                  fontWeight: e.isActive ? "bold" : "normal",
                };
              }}
            >
              <MdTaskAlt className="text-xl" size={24} />
              <span>Approved Requests</span>
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
