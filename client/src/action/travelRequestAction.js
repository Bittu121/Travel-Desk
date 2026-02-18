import * as travelRequestApi from "../api/travelRequestApi.js";
import { toast } from "react-toastify";

export const travelRequestForm = (formData) => async (dispatch) => {
  dispatch({ type: "TRAVEL_REQUEST_START" });
  try {
    const { data } = await travelRequestApi.travelRequestForm(formData);
    dispatch({ type: "TRAVEL_REQUEST_FORM", data: data });
    toast.success(data.message);
  } catch (error) {
    const errorMessage = error.response?.data?.message;
    dispatch({
      type: "TRAVEL_REQUEST_FAIL",
      error: errorMessage || "Travel request failed",
    });
    toast.error(errorMessage);
    return { type: "TRAVEL_REQUEST_FAIL", error };
  }
};
