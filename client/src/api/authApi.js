import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_KEY}/api/auth/user`,
  withCredentials: true,
});

export const register = (formData) => API.post("/register", formData);
export const login = (formData) => API.post("/login", formData);
export const logout = () => API.post("/logout");
export const getUserData = () => API.get("/");

export const getAllUsers = () => API.get("/all-users");
export const updateUser = (userId, updateData) => API.put(`/update-user/${userId}`, updateData);
export const deleteUser = (userId) => API.delete(`/delete-user/${userId}`);

export const forgotPassword = (formData) => API.post("/forgot-password", formData);


