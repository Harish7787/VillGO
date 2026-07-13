import axios from "axios";

// const API = "https://villgo-backend-1.onrender.com/api/products";
const API = "http://localhost:8080/api/products";

const token = () => localStorage.getItem("token");

export const getActiveProducts = () =>
  axios.get(`${API}/active`);

export const getDeletedProducts = () =>
  axios.get(`${API}/deleted`, {
    headers: {
      Authorization: `Bearer ${token()}`
    }
  });

export const deleteProduct = (id) =>
  axios.delete(`${API}/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token()}`
    }
  });

export const restoreProduct = (id) =>
  axios.put(`${API}/restore/${id}`, {}, {
    headers: {
      Authorization: `Bearer ${token()}`
    }
  });

export const addProduct = (formData) =>
  axios.post(`${API}/add`, formData, {
    headers: {
      Authorization: `Bearer ${token()}`
    }
  });

export const updateProduct = (id, formData) =>
  axios.put(`${API}/update/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token()}`
    }
  });