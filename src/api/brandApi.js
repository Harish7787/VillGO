import axios from "axios";
const API = "http://localhost:8080/api/brands";

export const getActiveBrands = () =>
    axios.get(`${API}/active`);

export const getDeletedBrands = () => {
    const token = localStorage.getItem("token");

    return axios.get(`${API}/deleted`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};