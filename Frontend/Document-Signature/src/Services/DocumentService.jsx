import axios from "axios";

const API_URL = "http://localhost:8079/api/documents";

const getToken = () => {
    return localStorage.getItem("token");
};

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${getToken()}`
    }
});

export const getMyDocuments = () => {
    return axios.get(
        `${API_URL}/my`,
        authHeader()
    );
};

export const getDocumentById = (id) => {
    return axios.get(
        `${API_URL}/details/${id}`,
        authHeader()
    );
};

export const getPdfUrl = (id) => {
    return `${API_URL}/download/${id}`;
};

export const saveSignature = (
    documentId,
    x,
    y
) => {

    return axios.post(
        "http://localhost:8079/api/signatures",
        {
            documentId,
            x,
            y,
            page: 1
        },
        authHeader()
    );
};