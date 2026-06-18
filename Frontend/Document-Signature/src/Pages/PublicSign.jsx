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

    const rejectDocument =
        async (signatureId) => {

            const reason =
                prompt(
                    "Enter Rejection Reason"
                );

            if (!reason) {

                return;
            }

            try {

                await axios.post(
                    `http://localhost:8079/api/public/reject/${token}/${signatureId}`,
                    {
                        reason
                    }
                );

                alert(
                    "Document Rejected"
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
                                    "1px solid black",

                                padding:
                                    "15px",

                                marginBottom:
                                    "15px",

                                width:
                                    "350px"
                            }}
                        >

                            <h3>
                                Signature ID :
                                {" "}
                                {sig.id}
                            </h3>

                            <p>
                                Status :
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

                                    <>
                                        <button
                                            onClick={() =>
                                                signDocument(
                                                    sig.id
                                                )
                                            }
                                        >
                                            Sign Here
                                        </button>

                                        <button
                                            style={{
                                                marginLeft:
                                                    "10px"
                                            }}
                                            onClick={() =>
                                                rejectDocument(
                                                    sig.id
                                                )
                                            }
                                        >
                                            Reject
                                        </button>
                                    </>
                                )
                            }

                            {
                                sig.status ===
                                "SIGNED" && (

                                    <button
                                        disabled
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