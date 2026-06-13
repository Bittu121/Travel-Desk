import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUserTravelRequests } from "../action/travelRequestAction.js";
import LoadingSpinner from "../pages/LoadingSpinner.jsx";
import {
  MdOutlineFlightTakeoff,
  MdOutlineEventAvailable,
} from "react-icons/md";
import { FiClock, FiCheckCircle } from "react-icons/fi";

function Dashboard() {
  const dispatch = useDispatch();
  const { authData: user } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.travelRequest);

  const fullName = user?.user?.fullName || "User";
  const role = user?.user?.role || "user";

  // Only applicant roles have an "applied requests" dashboard.
  // Send other roles to their primary landing page.
  const canViewDashboard =
    role === "user" || role === "manager" || role === "hr";

  const [appliedForm, setAppliedForm] = useState([]);

  const fetchUserTravelRequests = async () => {
    try {
      const data = await dispatch(getUserTravelRequests());
      setAppliedForm(data?.data || []);
    } catch (err) {
      console.error("Error fetching travel requests:", err);
    }
  };

  useEffect(() => {
    if (canViewDashboard) {
      fetchUserTravelRequests();
    }
  }, [dispatch, canViewDashboard]);

  const stats = useMemo(() => {
    const total = appliedForm.length;
    const booked = appliedForm.filter((i) => i.isBooked).length;
    const approved = appliedForm.filter(
      (i) => i.isB2Approved && !i.isBooked,
    ).length;
    const rejected = appliedForm.filter(
      (i) => i.isB1Rejected || i.isB2Rejected,
    ).length;
    const pending = appliedForm.filter(
      (i) =>
        !i.isBooked && !i.isB2Approved && !i.isB1Rejected && !i.isB2Rejected,
    ).length;
    return { total, pending, approved, booked, rejected };
  }, [appliedForm]);

  const cards = [
    {
      label: "Total Requests",
      value: stats.total,
      icon: <MdOutlineFlightTakeoff size={24} />,
      iconWrap: "bg-indigo-50 text-indigo-600",
      hint: "All travel requests you've raised",
    },
    {
      label: "Pending Approval",
      value: stats.pending,
      icon: <FiClock size={22} />,
      iconWrap: "bg-orange-50 text-orange-600",
      hint: "Awaiting manager / HR approval",
    },
    {
      label: "Approved",
      value: stats.approved,
      icon: <FiCheckCircle size={22} />,
      iconWrap: "bg-green-50 text-green-600",
      hint: "Approved and sent to vendor",
    },
    {
      label: "Booked",
      value: stats.booked,
      icon: <MdOutlineEventAvailable size={24} />,
      iconWrap: "bg-blue-50 text-blue-600",
      hint: "Tickets booked by vendor",
    },
  ];

  // Non-applicant roles (vendor, finance) have no applied dashboard —
  // send them to their primary page so a page refresh lands correctly.
  if (!canViewDashboard) {
    return (
      <Navigate
        to={role === "finance" ? "/approved-requests" : "/pending-requests"}
        replace
      />
    );
  }

  return (
    <div className="bg-[#f4f6fb] min-h-screen p-2">
      {/* Welcome header */}
      <div className="bg-white rounded-xl shadow-xs p-6 mb-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Welcome back, {fullName} 👋
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Here's an overview of your travel requests.
            </p>
          </div>
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-indigo-50 text-indigo-600 capitalize">
            {role}
          </span>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl shadow-xs p-6">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="bg-white rounded-xl shadow-xs p-6">
          <p className="text-red-500">{error}</p>
        </div>
      ) : (
        <>
          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
            {cards.map((card) => (
              <div
                key={card.label}
                className="bg-white rounded-xl shadow-xs p-6 min-h-[180px] flex flex-col justify-between hover:shadow-sm transition"
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`h-12 w-12 rounded-lg flex items-center justify-center ${card.iconWrap}`}
                  >
                    {card.icon}
                  </div>
                  <span className="text-3xl font-semibold text-gray-800">
                    {card.value}
                  </span>
                </div>
                <div>
                  <p className="text-base font-semibold text-gray-800">
                    {card.label}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{card.hint}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
