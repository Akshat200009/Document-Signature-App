import { useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";

import { Document, Page, pdfjs } from "react-pdf";

import axios from "axios";

pdfjs.GlobalWorkerOptions.workerSrc =
    new URL(
        "pdfjs-dist/build/pdf.worker.min.mjs",
        import.meta.url
    ).toString();

function DocumentPreview() {

    const { id } = useParams();

    const [signatures, setSignatures] =
        useState([]);

    const [numPages, setNumPages] =
        useState(null);

    const token =
        localStorage.getItem("token");

    const pdfUrl =
        `http://localhost:8079/api/documents/download/${id}`;

    const file = useMemo(
        () => ({
            url: pdfUrl,
            httpHeaders: {
                Authorization:
                    `Bearer ${token}`
            }
        }),
        [pdfUrl, token]
    );

    useEffect(() => {

        loadSignatures();

    }, []);

    const loadSignatures = async () => {

        try {

            const response =
                await axios.get(
                    `http://localhost:8079/api/signatures/document/${id}`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            setSignatures(
                response.data
            );

        } catch (error) {

            console.log(
                "Error Loading Signatures",
                error
            );
        }
    };

    return (

        <div
            style={{
                padding: "20px",
                textAlign: "center"
            }}
        >

            <h1>
                Document Preview
            </h1>

            <div
                style={{
                    position: "relative",
                    display: "inline-block"
                }}
            >

                <Document
                    file={file}
                    onLoadSuccess={({ numPages }) =>
                        setNumPages(numPages)
                    }
                    onLoadError={(error) =>
                        console.log(error)
                    }
                >

                    <Page
                        pageNumber={1}
                    />

                </Document>

                {
                    signatures.map(
                        (sig) => (

                            <div
                                key={sig.id}
                                style={{
                                    position:
                                        "absolute",
                                    left:
                                        sig.x,
                                    top:
                                        sig.y,
                                    backgroundColor:
                                        "red",
                                    color:
                                        "white",
                                    padding:
                                        "8px 15px",
                                    borderRadius:
                                        "5px",
                                    fontWeight:
                                        "bold"
                                }}
                            >
                                Sign Here
                            </div>
                        )
                    )
                }

            </div>

        </div>
    );
}

export default DocumentPreview;