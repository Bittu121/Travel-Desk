import * as travelPendingApprovalApi from "../api/travelPendingApprovalApi.js";
import { toast } from "react-toastify";

export const getAllTravelRequestsByRole = () => async (dispatch) => {
  dispatch({ type: "GET_ALL_TRAVEL_REQUESTS_START" });
  try {
    const { data } =
      await travelPendingApprovalApi.getAllTravelRequestsByRole();
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

export const updatePendingTravelRequestById =
  (id, updateData) => async (dispatch) => {
    dispatch({ type: "UPDATE_TRAVEL_REQUEST_START" });
    try {
      const { data } =
        await travelPendingApprovalApi.updatePendingTravelRequestById(
          id,
          updateData,
        );
      dispatch({ type: "UPDATE_TRAVEL_REQUEST", data: data });
      toast.success(data.message);
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      console.error("Update Travel Request Error:", error.response || error);
      dispatch({
        type: "UPDATE_TRAVEL_REQUEST_FAIL",
        error: errorMessage || "Failed to update travel request",
      });
      toast.error(errorMessage);
    }
  };
