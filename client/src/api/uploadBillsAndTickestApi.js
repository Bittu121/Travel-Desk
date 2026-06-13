import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_KEY}/api/v1/travel`,
  withCredentials: true,
});

export const uploadBill = (id, fileData) =>
  API.put(`/upload-bill/${id}`, fileData);

export const getUploadBillsByRequestId = (id) => API.get(`/${id}/uploadBill`);

export const deleteBill = (id, filePath) =>
  API.delete(`/${id}/deleteBill`, { data: { filePath } });

export const uploadTicket = (id, fileData) =>
  API.put(`/upload-ticket/${id}`, fileData);

export const getUploadTicketByRequestId = (id) =>
  API.get(`/${id}/uploadTicket`);

export const deleteTicket = (id, filePath) =>
  API.delete(`/${id}/deleteTicket`, { data: { filePath } });
