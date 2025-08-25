import React from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { MdCardTravel } from "react-icons/md";
import { FaUserLarge } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa";
import { SiReacthookform } from "react-icons/si";
import { SlPlane } from "react-icons/sl";

const Sidebar = ({ isOpen, toggleSidebar }) => {
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
              <MdDashboard className="text-xl" size={22} />
              <span className={`${isOpen ? "hidden" : "block"}`}>
                Dashboard
              </span>
            </NavLink>
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
              <SlPlane className="text-xl" size={22} />
              <span className={`${isOpen ? "hidden" : "block"}`}>
                Travel Request Form
              </span>
            </NavLink>
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
              <SiReacthookform className="text-xl" size={22} />
              <span className={`${isOpen ? "hidden" : "block"}`}>
                Applied Form
              </span>
            </NavLink>
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
              <FaUserLarge className="text-xl" size={22} />
              <span className={`${isOpen ? "hidden" : "block"}`}>
                Create User
              </span>
            </NavLink>
            <NavLink
              to="/travel-requests"
              className="flex items-center gap-4 p-4 text-gray-500"
              style={(e) => {
                return {
                  color: e.isActive ? "blue" : "black",
                  fontWeight: e.isActive ? "bold" : "normal",
                };
              }}
            >
              <MdCardTravel className="text-xl" size={24} />
              <span className={`${isOpen ? "hidden" : "block"}`}>
                Travel Requests
              </span>
            </NavLink>
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
              <FaUserCheck className="text-xl" size={24} />
              <span className={`${isOpen ? "hidden" : "block"}`}>
                Approved Requests
              </span>
            </NavLink>
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
            <SlPlane className="text-xl" size={24} />
            <span>Travel Request Form</span>
          </NavLink>
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
            <SiReacthookform className="text-xl" size={24} />
            <span>Applied Form</span>
          </NavLink>
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
            <FaUserLarge className="text-xl" size={24} />
            <span>Create User</span>
          </NavLink>
          <NavLink
            to="/travel-requests"
            className="flex items-center gap-4 p-4 text-gray-500"
            style={(e) => {
              return {
                color: e.isActive ? "blue" : "black",
                fontWeight: e.isActive ? "bold" : "normal",
              };
            }}
          >
            <MdCardTravel className="text-xl" size={24} />
            <span>Travel Requests</span>
          </NavLink>
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
            <FaUserCheck className="text-xl" size={24} />
            <span>Approved Requests</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
