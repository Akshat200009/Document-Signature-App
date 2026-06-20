import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function PublicSign() {

    const { token } = useParams();

    const [documentData,
        setDocumentData] =
        useState(null);

    useEffect(() => {

        loadDocument();

    }, []);

    const loadDocument =
        async () => {

            try {

                const response =
                    await axios.get(
                        `http://localhost:8079/api/public/document/${token}`
                    );

                setDocumentData(
                    response.data
                );

            } catch (error) {

                console.log(error);

                alert(
                    "Unable to load document"
                );
            }
        };

    const signDocument =
        async (signatureId) => {

            try {

                await axios.post(
                    `http://localhost:8079/api/public/sign/${token}/${signatureId}`
                );

                alert(
                    "Document Signed Successfully"
                );

                loadDocument();

            } catch (error) {

                console.log(error);

                alert(
                    "Signing Failed"
                );
            }
        };

    const rejectDoc =
        async () => {

            const reason =
                prompt(
                    "Enter Rejection Reason"
                );

            if (!reason) {

                return;
            }

            try {

                await axios.post(
                    `http://localhost:8079/api/public/reject/${token}`,
                    {
                        reason
                    }
                );

                alert(
                    "Document Rejected Successfully"
                );

                loadDocument();

            } catch (error) {

                console.log(error);

                alert(
                    "Rejection Failed"
                );
            }
        };

    if (!documentData) {

        return <h2>Loading...</h2>;
    }

    return (

        <div
            style={{
                padding: "20px"
            }}
        >

            <h1>
                Public Signature Page
            </h1>

            <h3>
                Document Id :
                {" "}
                {documentData.documentId}
            </h3>

            <h2>
                Available Signatures
            </h2>

            {
                documentData.signatures.map(
                    (sig) => (

                        <div
                            key={sig.id}
                            style={{
                                border:
                                    "1px solid #ddd",
                                borderRadius:
                                    "10px",
                                padding:
                                    "20px",
                                marginBottom:
                                    "20px",
                                width:
                                    "400px",
                                boxShadow:
                                    "0 2px 10px rgba(0,0,0,0.1)"
                            }}
                        >

                            <h3>
                                Signature ID :
                                {" "}
                                {sig.id}
                            </h3>

                            <p>
                                <strong>Status:</strong>
                                {" "}
                                {sig.status}
                            </p>

                            {
                                sig.status ===
                                "REJECTED" && (

                                    <p>
                                        <strong>
                                            Reason:
                                        </strong>
                                        {" "}
                                        {
                                            sig.rejectionReason
                                        }
                                    </p>

                                )
                            }

                            {
                                sig.status ===
                                "PENDING" && (

                                    <div
                                        style={{
                                            display:
                                                "flex",
                                            gap:
                                                "10px",
                                            marginTop:
                                                "15px"
                                        }}
                                    >

                                        <button
                                            onClick={() =>
                                                signDocument(
                                                    sig.id
                                                )
                                            }
                                            style={{
                                                background:
                                                    "#16a34a",
                                                color:
                                                    "white",
                                                border:
                                                    "none",
                                                padding:
                                                    "10px 20px",
                                                borderRadius:
                                                    "6px",
                                                cursor:
                                                    "pointer"
                                            }}
                                        >
                                            Sign Document
                                        </button>

                                        <button
                                            onClick={
                                                rejectDoc
                                            }
                                            style={{
                                                background:
                                                    "#dc2626",
                                                color:
                                                    "white",
                                                border:
                                                    "none",
                                                padding:
                                                    "10px 20px",
                                                borderRadius:
                                                    "6px",
                                                cursor:
                                                    "pointer"
                                            }}
                                        >
                                            Reject Document
                                        </button>

                                    </div>

                                )
                            }

                            {
                                sig.status ===
                                "SIGNED" && (

                                    <button
                                        disabled
                                        style={{
                                            background:
                                                "#16a34a",
                                            color:
                                                "white",
                                            border:
                                                "none",
                                            padding:
                                                "10px 20px",
                                            borderRadius:
                                                "6px"
                                        }}
                                    >
                                        Signed
                                    </button>

                                )
                            }

                            {
                                sig.status ===
                                "REJECTED" && (

                                    <button
                                        disabled
                                        style={{
                                            background:
                                                "#dc2626",
                                            color:
                                                "white",
                                            border:
                                                "none",
                                            padding:
                                                "10px 20px",
                                            borderRadius:
                                                "6px"
                                        }}
                                    >
                                        Rejected
                                    </button>

                                )
                            }

                        </div>

                    )
                )
            }

        </div>

    );
}

export default PublicSign;