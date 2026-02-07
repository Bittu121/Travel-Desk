import React, { useState } from "react";
import { MdPersonAdd } from "react-icons/md";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function TravelRequestForm() {
  const { authData } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: authData?.user?.fullName || "",
    empCode: authData?.user?.empCode || "",
    designation: authData?.user?.designation || "",
    department: authData?.user?.department || "",
    dateOfRequest: new Date().toISOString().split("T")[0],
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTravelerChange = (index, e) => {
    const { name, value } = e.target;
    const travelers = [...formData.travelers];
    travelers[index][name] = value;
    setFormData({ ...formData, travelers });
  };

  const addTraveler = () => {
    setFormData({
      ...formData,
      travelers: [...formData.travelers, { name: "", age: "", gender: "" }],
    });
  };

  const removeTraveler = (index) => {
    setFormData({
      ...formData,
      travelers: formData.travelers.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //api call
      console.log("formData", formData);
    } catch (error) {
      console.log("Failed to submit travel request. Please try again.", error);
    }
    setFormData({
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
      travelers: [{ name: "", age: "", gender: "" }] || "",
    });
  };

  const input =
    "w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500";

  const label = "text-xs font-medium text-gray-600 uppercase tracking-wide";

  const section = "bg-white border border-gray-200 rounded-xl p-6";

  return (
    <div className="max-w-5xl mx-auto mb-32 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Travel Request</h1>
      </div>

      {/* Employee Info */}
      <div className={section}>
        <h2 className="text-sm font-semibold text-gray-800 mb-4">
          Employee Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className={label}>Name</label>
            <input readOnly value={formData.name} className={input} />
          </div>
          <div>
            <label className={label}>EMP Code</label>
            <input readOnly value={formData.empCode} className={input} />
          </div>
          <div>
            <label className={label}>Designation</label>
            <input readOnly value={formData.designation} className={input} />
          </div>
          <div>
            <label className={label}>Region</label>
            <input readOnly value={formData.department} className={input} />
          </div>
        </div>
      </div>

      {/* Travel Details */}
      <div className={section}>
        <h2 className="text-sm font-semibold text-gray-800 mb-4">
          Travel Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="date"
            name="dateOfRequest"
            value={formData.dateOfRequest}
            onChange={handleChange}
            required
            className={input}
          />
          <input
            type="date"
            name="travelDate"
            value={formData.travelDate}
            onChange={handleChange}
            required
            className={input}
          />
          <input
            type="date"
            name="returnDate"
            value={formData.returnDate}
            onChange={handleChange}
            required
            className={input}
          />
          <input
            name="source"
            placeholder="Source Station"
            value={formData.source}
            onChange={handleChange}
            required
            className={input}
          />
          <input
            name="destination"
            placeholder="Destination Station"
            value={formData.destination}
            onChange={handleChange}
            required
            className={input}
          />
          <input
            name="purposeOfTravel"
            placeholder="Purpose of Travel"
            value={formData.purposeOfTravel}
            onChange={handleChange}
            required
            className={input}
          />
          <input
            name="proposedVisit"
            placeholder="Proposed Customer Visit"
            value={formData.proposedVisit}
            onChange={handleChange}
            required
            className={input}
          />
          <select
            name="travelMode"
            value={formData.travelMode}
            onChange={handleChange}
            required
            className={input}
          >
            <option value="">Mode of Travel</option>
            <option value="air">By Air</option>
            <option value="train">By Train</option>
            <option value="bus">By Bus</option>
            <option value="cab">By Cab</option>
          </select>
          <select
            name="reportingManager"
            value={formData.reportingManager}
            onChange={handleChange}
            required
            className={input}
          >
            <option value="">Reporting Manager</option>
            <option value="bittu">Bittu Kumar</option>
          </select>
        </div>
      </div>

      {/* Hotel Stay */}
      <div className={section}>
        <h2 className="text-sm font-semibold text-gray-800 mb-4">Hotel Stay</h2>
        <div className="flex gap-6 mb-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="hotelStay"
              value="yes"
              onChange={handleChange}
            />
            Yes
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="hotelStay"
              value="no"
              onChange={handleChange}
            />
            No
          </label>
        </div>
        {formData.hotelStay === "yes" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="date"
              name="checkInDate"
              value={formData.checkInDate}
              onChange={handleChange}
              required
              className={input}
            />
            <input
              type="date"
              name="checkOutDate"
              value={formData.checkOutDate}
              onChange={handleChange}
              required
              className={input}
            />
          </div>
        )}
      </div>

      {/* Travelers */}
      <div className={section}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-semibold text-gray-800">Travelers</h2>
          <button
            type="button"
            onClick={addTraveler}
            className="flex items-center gap-1 text-sm"
          >
            <MdPersonAdd /> Add
          </button>
        </div>

        {formData.travelers.map((t, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
            <input
              name="name"
              placeholder="Name"
              value={t.name}
              onChange={(e) => handleTravelerChange(i, e)}
              required
              className={input}
            />
            <input
              name="age"
              placeholder="Age"
              value={t.age}
              onChange={(e) => handleTravelerChange(i, e)}
              required
              className={input}
            />
            <select
              name="gender"
              value={t.gender}
              onChange={(e) => handleTravelerChange(i, e)}
              required
              className={input}
            >
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            {i > 0 && (
              <button
                onClick={() => removeTraveler(i)}
                className="text-gray-400 hover:text-red-500"
              >
                <IoPersonRemoveSharp />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Remarks */}
      <div className={section}>
        <label className={label}>Remarks</label>
        <input
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
          className={input}
        />
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-3 flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-10 cursor-pointer py-2 text-sm font-medium bg-gray-900 text-white rounded-md hover:bg-black"
          >
            Submit Request
          </button>
        </div>
      </div>
    </div>
  );
}

export default TravelRequestForm;
