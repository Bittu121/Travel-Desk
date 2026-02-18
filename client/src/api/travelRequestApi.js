import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_KEY}/api/v1/travel`,
  withCredentials: true,
});

export const travelRequestForm = (formData) =>
  API.post("/travel-request", formData);