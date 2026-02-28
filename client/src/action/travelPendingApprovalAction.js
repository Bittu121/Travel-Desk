import * as travelPendingApprovalApi from "../api/travelPendingApprovalApi.js";
import { toast } from "react-toastify";

export const getAllTravelRequestsByRole = () => async (dispatch) => {
  dispatch({ type: "GET_ALL_TRAVEL_REQUESTS_START" });
  try {
    const { data } = await travelPendingApprovalApi.getAllTravelRequestsByRole();
    dispatch({ type: "GET_ALL_TRAVEL_REQUESTS", data: data });
    return data;
  } catch (error) {
    dispatch({
      type: "GET_ALL_TRAVEL_REQUESTS_FAIL",
      error: error.response?.data?.message || "Failed to get travel requests",
    });
    console.error(error);
  }
};

export const getTravelRequestById = () => async (dispatch) => {};
