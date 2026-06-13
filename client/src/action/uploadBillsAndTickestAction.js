import * as uploadBillsAndTickestApi from "../api/uploadBillsAndTickestApi.js";
import { toast } from "react-toastify";

export const uploadBill = (id, fileData) => async (dispatch) => {
  dispatch({ type: "UPLOAD_BILL_START" });
  try {
    const { data } = await uploadBillsAndTickestApi.uploadBill(id, fileData);
    dispatch({ type: "UPLOAD_BILL_SUCCESS", data: data.data });
    toast.success(data.message);
    // console.log("data", data);
    return data;
  } catch (error) {
    const errMsg =
      error?.response?.data?.message || error?.message || "Upload failed";
    dispatch({ type: "UPLOAD_BILL_FAIL", error: errMsg });
    toast.error(errMsg);
  }
};

export const uploadTicket = (id, fileData) => async (dispatch) => {
  dispatch({ type: "UPLOAD_TICKET_START" });
  try {
    const { data } = await uploadBillsAndTickestApi.uploadTicket(id, fileData);
    dispatch({ type: "UPLOAD_TICKET_SUCCESS", data: data.data });
    toast.success(data.message);
    // console.log("ticket", data);
    return data;
  } catch (error) {
    const errMsg =
      error?.response?.data?.message || error?.message || "Upload failed";
    dispatch({ type: "UPLOAD_TICKET_FAIL", error: errMsg });
    toast.error(errMsg);
  }
};
