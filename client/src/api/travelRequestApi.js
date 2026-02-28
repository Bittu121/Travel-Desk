import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_KEY}/api/v1/travel`,
  withCredentials: true,
});

//Travel Request Form
export const travelRequestForm = (formData) =>
  API.post("/travel-request", formData);

//Applied form Details
export const getUserTravelRequests = () => API.get("/requests/me");