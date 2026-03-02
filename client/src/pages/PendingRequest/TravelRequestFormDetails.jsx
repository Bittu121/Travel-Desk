import React, { useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { IoMdPrint } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./TravelRequestFormDetails.css";
import { getTravelRequestById } from "../../api/travelPendingApprovalApi.js";
import { getManagers } from "../../action/authAction.js";
import { TfiControlBackward } from "react-icons/tfi";

function TravelRequestFormDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { authData } = useSelector((state) => state.auth);
  const userRole = authData?.user?.role;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: authData?.user?.fullName || "",
    empCode: authData?.user?.empCode || "",
    designation: authData?.user?.designation || "",
    department: authData?.user?.department || "",
    travelRequestId: "",
    dateOfRequest: "",
    travelDate: "",
    returnDate: "",
    source: "",
    destination: "",
    purposeOfTravel: "",
    proposedVisit: "",
    travelMode: "",
    hotelStay: "",
    checkInDate: "",
    checkOutDate: "",
    reportingManager: "",
    remarks: "",
    travelers: [{ name: "", age: "", gender: "" }],
  });

  const fetchTravelRequestFormDetails = async () => {
    try {
      const response = await getTravelRequestById(id);
      if (response.status !== 200) {
        throw new Error("Failed to fetch data");
      }
      setFormData(response?.data?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchTravelRequestFormDetails();
  }, []);

  //get manager
  useEffect(() => {
    dispatch(getManagers());
  }, [dispatch]);
  const { managers } = useSelector((state) => state.auth);

  //Print
  const componentRef = React.useRef(null);

  const handleAfterPrint = React.useCallback(() => {
    console.log("`onAfterPrint` called");
  }, []);

  const handleBeforePrint = React.useCallback(() => {
    console.log("`onBeforePrint` called");
    return Promise.resolve();
  }, []);

  const printFn = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Purchase Order",
    onAfterPrint: handleAfterPrint,
    onBeforePrint: handleBeforePrint,
  });

  return (
    <>
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg border border-gray-200 mt-8 mb-20">
        <div
          className={`${
            userRole == "user"
              ? "flex justify-end mb-6"
              : "flex justify-between mb-6"
          }`}
        >
          {userRole !== "user" && (
            <button
              onClick={() => navigate("/pending-requests")}
              className="flex items-center gap-2 cursor-pointer bg-white text-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium shadow-sm
                   hover:bg-gray-100 transition-all duration-300 ease-in-out"
            >
              <TfiControlBackward size={18} />
              Back
            </button>
          )}
          <button
            className="flex items-center gap-2 cursor-pointer bg-gradient-to-r from-indigo-600 to-indigo-500
                   text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-sm 
                   hover:from-indigo-700 hover:to-indigo-600 active:scale-95 transition-all duration-300 ease-in-out"
            onClick={printFn}
          >
            Print <IoMdPrint />
          </button>
        </div>

        <div ref={componentRef} className="print-container">
          {/* Print Header */}
          <div className="relative hidden printHeader border-b border-gray-200 pb-4 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 text-center">
              Travel Desk Management System
            </h2>
            {/* <img className="w-16 absolute right-0 top-0" src={Logo} alt="" /> */}
          </div>

          <form className="space-y-8">
            {/* Travel ID */}
            <div className="text-sm text-gray-600 border-b border-gray-200 pb-4">
              Travel Id :
              <span className="font-medium text-indigo-600 ml-1">
                {formData.travelRequestId}
              </span>
            </div>

            {/* Employee Details */}
            <div>
              <h3 className="text-base font-semibold text-gray-800 mb-4">
                Employee Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { label: "Name", value: formData.name },
                  { label: "EMP Code", value: formData.empCode },
                  { label: "Designation", value: formData.designation },
                  { label: "Region", value: formData.department },
                ].map((field, index) => (
                  <div key={index}>
                    <label className="block text-sm text-gray-600 mb-1">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={field.value}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50 focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Travel Details */}
            <div>
              <h3 className="text-base font-semibold text-gray-800 mb-4">
                Travel Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Date Fields */}
                {[
                  {
                    label: "Date Of Request",
                    value: formData.dateOfRequest
                      ? new Date(formData.dateOfRequest)
                          .toISOString()
                          .split("T")[0]
                      : "",
                  },
                  {
                    label: "Date of Travel",
                    value: formData.travelDate
                      ? new Date(formData.travelDate)
                          .toISOString()
                          .split("T")[0]
                      : "",
                  },
                  {
                    label: "Date of Return",
                    value: formData.returnDate
                      ? new Date(formData.returnDate)
                          .toISOString()
                          .split("T")[0]
                      : "",
                  },
                  { label: "Source Station", value: formData.source },
                  { label: "Destination Station", value: formData.destination },
                  {
                    label: "Purpose of Travel",
                    value: formData.purposeOfTravel,
                  },
                  {
                    label: "Proposed Customer Visit",
                    value: formData.proposedVisit,
                  },
                  { label: "Mode of Travel", value: formData.travelMode },
                ].map((field, index) => (
                  <div key={index}>
                    <label className="block text-sm text-gray-600 mb-1">
                      {field.label}
                    </label>
                    <input
                      type={field.label.includes("Date") ? "date" : "text"}
                      readOnly
                      value={field.value}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50 focus:outline-none"
                    />
                  </div>
                ))}

                {/* Reporting Manager */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Reporting Manager
                  </label>
                  <select
                    readOnly
                    value={formData.reportingManager}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50 focus:outline-none"
                  >
                    <option value="">Select Reporting Manager</option>
                    {managers?.map((manager) => (
                      <option key={manager._id} value={manager.email}>
                        {manager.fullName.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Hotel Stay */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Hotel Stay
                  </label>
                  <div className="flex items-center gap-6 border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-sm">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="yes"
                        checked={formData.hotelStay === "yes"}
                        readOnly
                        className="accent-indigo-600"
                      />
                      Yes
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="no"
                        checked={formData.hotelStay === "no"}
                        readOnly
                        className="accent-indigo-600"
                      />
                      No
                    </label>
                  </div>
                </div>

                {/* Hotel Dates */}
                {formData.hotelStay === "yes" && (
                  <>
                    {[
                      {
                        label: "Check-in Date",
                        value: formData.checkInDate
                          ? new Date(formData.checkInDate)
                              .toISOString()
                              .split("T")[0]
                          : "",
                      },
                      {
                        label: "Check-out Date",
                        value: formData.checkOutDate
                          ? new Date(formData.checkOutDate)
                              .toISOString()
                              .split("T")[0]
                          : "",
                      },
                    ].map((field, index) => (
                      <div key={index}>
                        <label className="block text-sm text-gray-600 mb-1">
                          {field.label}
                        </label>
                        <input
                          type="date"
                          readOnly
                          value={field.value}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50 focus:outline-none"
                        />
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>

            {/* Remarks */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Remarks
              </label>
              <input
                type="text"
                readOnly
                value={formData.remarks ? formData.remarks : "No Remarks"}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50 focus:outline-none"
              />
            </div>

            {/* Travelers */}
            <div>
              <h3 className="text-base font-semibold text-gray-800 mb-4">
                Travelers
              </h3>

              {formData.travelers.map((traveler, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-4 border border-gray-200 rounded-md mt-3"
                >
                  <input
                    type="text"
                    readOnly
                    value={traveler.name}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50"
                  />
                  <input
                    type="number"
                    readOnly
                    value={traveler.age}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50"
                  />
                  <input
                    readOnly
                    value={traveler.gender}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50"
                  />
                </div>
              ))}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default TravelRequestFormDetails;
