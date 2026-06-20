import axios from "axios";

const API_URL =
    "http://localhost:8079/api/documents";

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
            `${API_URL}/upload`,
            formData,
            authHeader()
        );
    };

export const getMyDocuments =
    () => {

        return axios.get(
            `${API_URL}/my`,
            authHeader()
        );
    };

export const getDocumentById =
    (id) => {

        return axios.get(
            `${API_URL}/details/${id}`,
            authHeader()
        );
    };

export const getPdfUrl =
    (id) => {

        return `${API_URL}/download/${id}`;
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
            "http://localhost:8079/api/signatures",
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
        `http://localhost:8079/api/documents/reject/${id}`,
        {},
        authHeader()
    );
};
export const sendSigningLink =
    (documentId, email) => {

        return axios.post(
            `http://localhost:8079/api/public/create-link/${documentId}`,
            {
                email
            },
            authHeader()
        );
    };
    export const deleteDocument =
    (id) => {

        return axios.delete(
            `${API_URL}/${id}`,
            authHeader()
        );
    };