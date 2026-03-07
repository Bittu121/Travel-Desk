export const travelRequestResponseDTO = (travel) => {
  return {
    id: travel._id,

    travelRequestId: travel.travelRequestId,

    name: travel.name,
    empCode: travel.empCode,
    designation: travel.designation,
    department: travel.department,

    dateOfRequest: travel.dateOfRequest,
    travelDate: travel.travelDate,
    returnDate: travel.returnDate,

    source: travel.source,
    destination: travel.destination,

    purposeOfTravel: travel.purposeOfTravel,
    proposedVisit: travel.proposedVisit,
    travelMode: travel.travelMode,

    hotelStay: travel.hotelStay,
    checkInDate: travel.checkInDate,
    checkOutDate: travel.checkOutDate,
    remarks: travel.remarks,

    reportingManager: travel.reportingManager,

    status: travel.status,
    isBooked: travel.isBooked,

    isB1Approved: travel.isB1Approved,
    isB1Rejected: travel.isB1Rejected,
    isB2Approved: travel.isB2Approved,
    isB2Rejected: travel.isB2Rejected,

    vendors: travel.vendors,

    travelers: travel.travelers,

    uploadBill: travel.uploadBill,
    uploadTicket: travel.uploadTicket,

    createdAt: travel.createdAt,
  };
};
