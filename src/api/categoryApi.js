import axios from "axios";

const API = "http://localhost:8080/api/categories";
// const API = "https://villgo-backend-1.onrender.com/api/categories";
const token = () => localStorage.getItem("token");

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${token()}`
    }
});

// ================= GET =================

export const getActiveCategories = () =>
    axios.get(`${API}/active`, authHeader());

export const getDeletedCategories = () =>
    axios.get(`${API}/deleted`, authHeader());

// ================= CREATE =================

export const createCategory = (formData) =>
    axios.post(`${API}/add`, formData, {
        headers: {
            Authorization: `Bearer ${token()}`,
            "Content-Type": "multipart/form-data"
        }
    });

// ================= UPDATE =================

export const updateCategory = (id, formData) =>
    axios.put(`${API}/update/${id}`, formData, {
        headers: {
            Authorization: `Bearer ${token()}`,
            "Content-Type": "multipart/form-data"
        }
    });

// ================= DELETE =================

export const deleteCategory = (id) =>
    axios.delete(`${API}/softdelete/${id}`, authHeader());

// ================= RESTORE =================

export const restoreCategory = (id) =>
    axios.put(`${API}/restore/${id}`, {}, authHeader());

// ================= ACTION =================

export const changeCategoryAction = (id, action) =>
    axios.put(
        `${API}/action/${id}`,
        { action },
        authHeader()
    );