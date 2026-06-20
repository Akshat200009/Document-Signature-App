import axios from "axios";

const API_URL =
    "https://document-signature-app-vptj.onrender.com/api/auth";
    
export const registerUser = (
    userData) => {

    return axios.post(
        `${API_URL}/register`,
        userData
    );
};

export const loginUser = (
    loginData) => {

    return axios.post(
        `${API_URL}/login`,
        loginData
    );
};