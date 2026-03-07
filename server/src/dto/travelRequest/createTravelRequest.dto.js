import { travelerDTO } from "./traveler.dto.js";

export const createTravelRequestDTO = (data) => {
  return {
    name: data.name,
    empCode: data.empCode,
    designation: data.designation,
    department: data.department,

    dateOfRequest: data.dateOfRequest,

    travelDate: data.travelDate,
    returnDate: data.returnDate,

    source: data.source,
    destination: data.destination,

    purposeOfTravel: data.purposeOfTravel,
    proposedVisit: data.proposedVisit,

    travelMode: data.travelMode,
    hotelStay: data.hotelStay,

    checkInDate: data.checkInDate,
    checkOutDate: data.checkOutDate,

    reportingManager: data.reportingManager,

    vendors: data.vendors || "",
    remarks: data.remarks,

    bookMarks: data.bookMarks || null,

    travelers: data.travelers?.map(travelerDTO) || [],

    uploadBill: data.uploadBill || [],
    uploadTicket: data.uploadTicket || [],
  };
};
