export const updateTravelRequestDTO = (data) => {
  return {
    isB1Approved: data.isB1Approved,
    isB2Approved: data.isB2Approved,

    isB1Rejected: data.isB1Rejected,
    isB2Rejected: data.isB2Rejected,

    vendors: data.vendors,

    remarks: data.remarks,

    status: data.status,

    isBooked: data.isBooked,
  };
};
