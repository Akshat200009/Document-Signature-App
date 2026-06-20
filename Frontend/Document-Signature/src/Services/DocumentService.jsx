import axios from "axios";

const API_URL =
    "https://document-signature-app-vptj.onrender.com/api";

const getToken = () => {
    return localStorage.getItem("token");
};

const authHeader = () => ({
    headers: {
        Authorization:
            `Bearer ${getToken()}`
    }
});

export const uploadDocument =
    (formData) => {

        return axios.post(
            `${API_URL}/documents/upload`,
            formData,
            authHeader()
        );
    };

export const getMyDocuments =
    () => {

        return axios.get(
            `${API_URL}/documents/my`,
            authHeader()
        );
    };

export const getDocumentById =
    (id) => {

        return axios.get(
            `${API_URL}/documents/details/${id}`,
            authHeader()
        );
    };

export const getPdfUrl =
    (id) => {

        return `${API_URL}/documents/download/${id}`;
    };

export const saveSignature =
    (
        documentId,
        x,
        y,
        page,
        signatureText,
    fontFamily
    ) => {

        return axios.post(
            `${API_URL}/signatures`,
            {
                documentId,
                x,
                y,
                page,
                 signatureText,
                fontFamily
            },
            authHeader()
        );
    };

    export const rejectDocument = (id) => {

    return axios.put(
        `${API_URL}/documents/reject/${id}`,
        {},
        authHeader()
    );
};
export const sendSigningLink =
    (documentId, email) => {

        return axios.post(
            `${API_URL}/public/create-link/${documentId}`,
            {
                email
            },
            authHeader()
        );
    };
    export const deleteDocument =
    (id) => {

        return axios.delete(
            `${API_URL}/documents/${id}`,
            authHeader()
        );
    };