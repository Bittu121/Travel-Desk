import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_KEY}/api/v1`,
  withCredentials: true,
});

export const uploadBill = (id, fileData) =>
  API.put(`/bills/upload-bill/${id}`, fileData);

export const getUploadBillsByRequestId = (id) =>
  API.get(`/bills/${id}/uploadBill`);

export const deleteBill = (id, filePath) =>
  API.delete(`/bills/${id}/deleteBill`, { data: { filePath } });

export const uploadTicket = (id, fileData) =>
  API.put(`/tickets/upload-ticket/${id}`, fileData);

export const getUploadTicketByRequestId = (id) =>
  API.get(`/tickets/${id}/uploadTicket`);

export const deleteTicket = (id, filePath) =>
  API.delete(`/tickets/${id}/deleteTicket`, { data: { filePath } });
