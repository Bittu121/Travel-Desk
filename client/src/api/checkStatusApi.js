import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_KEY}/api/v1/status`,
  withCredentials: true,
});

// Payment status (finance)
export const updateStatus = (id, data) => API.put(`/status/${id}`, data);

// Vendor bookmarks
export const updateBookMark = (id, data) => API.put(`/bookMarks/${id}`, data);

// Vendor ticket booked status
export const updateBookedTicketStatus = (id, data) =>
  API.put(`/updateBookedStatus/${id}`, data);
