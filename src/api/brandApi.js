import axios from "axios";

const API = "http://localhost:8080/api/brands";
// const API = "https://villgo-backend-1.onrender.com/api/brands";
const token = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

export const getActiveBrands = () =>
    axios.get(`${API}/active`, token());

export const getDeletedBrands = () =>
    axios.get(`${API}/deleted`, token());

export const createBrand = (formData) =>
    axios.post(API, formData, token());

export const updateBrand = (id, formData) =>
    axios.put(`${API}/update/${id}`, formData, token());

export const deleteBrand = (id) =>
    axios.delete(`${API}/soft-delete/${id}`, token());

export const restoreBrand = (id) =>
    axios.put(`${API}/restore/${id}`, {}, token());

export const changeBrandAction = (id, action) =>
    axios.put(
        `${API}/action/${id}`,
        { action },
        token()
    );