import axios from "axios";

const API = "http://localhost:8080/api/auth";

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

// Active Admins
export const getActiveUsers = () =>
    axios.get(`${API}/admin/active`, authHeader());

// Deleted Admins
export const getDeletedUsers = () =>
    axios.get(`${API}/admin/deleted`, authHeader());

// Get One
export const getUser = (id) =>
    axios.get(`${API}/get-one-admin/${id}`, authHeader());

// Create
export const createUser = (data) =>
    axios.post(`${API}/admin/create-admin`, data, authHeader());

// Update
export const updateUser = (id, data) =>
    axios.put(`${API}/admin/update/${id}`, data, authHeader());

// Delete
export const deleteUser = (id) =>
    axios.put(`${API}/admin/soft-delete/${id}`, {}, authHeader());

// Restore
export const restoreUser = (id) =>
    axios.put(`${API}/restore-admin/${id}`, {}, authHeader());