import axios from "axios";

const API = "http://localhost:8080/api/categories";

export const getActiveCategories = () =>
    axios.get(`${API}/active`);
export const getDeletedCategories = () => {
    const token = localStorage.getItem("token");

    return axios.get(`${API}/deleted`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};