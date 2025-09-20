import * as AuthApi from "../api/authApi.js";
import { toast } from "react-toastify";

export const login = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.login(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
    toast.success(data.message);
    return { type: "AUTH_SUCCESS", data };
  } catch (error) {
    const errorMessage = error.response?.data?.message;
    dispatch({
      type: "AUTH_FAIL",
      error: errorMessage || "Login failed",
    });
    toast.error(errorMessage);
    return { type: "AUTH_FAIL", error };
  }
};

export const register = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.register(formData);
    dispatch({ type: "REGISTER_SUCCESS" });
    toast.success(data.message);
    return { type: "REGISTER_SUCCESS", data };
  } catch (error) {
    const errorMessage = error.response?.data?.message;
    dispatch({
      type: "AUTH_FAIL",
      error: errorMessage || "Register failed",
    });
    toast.error(errorMessage);
  }
};

export const logout = () => async (dispatch) => {
  try {
    await AuthApi.logout();
    dispatch({ type: "LOG_OUT" });
    toast.success("Logout successful");
  } catch (error) {
    toast.error(error.response?.data?.message || "Logout failed");
  }
};

export const getUserData = () => async (dispatch) => {
  try {
    const { data } = await AuthApi.getUserData();
    dispatch({ type: "USER_DETAILS_SUCCESS", data: data });
  } catch (error) {
    dispatch({
      type: "USER_DETAILS_FAIL",
      error: error.response?.data?.message || "Failed to get user details",
    });
  }
};
