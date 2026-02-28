import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_KEY}/api/v1/travel-requests`,
  withCredentials: true,
});

export const getAllTravelRequestsByRole = () => API.get("/pending");
export const getTravelRequestById = (id) => API.get(`/pending/${id}`);
