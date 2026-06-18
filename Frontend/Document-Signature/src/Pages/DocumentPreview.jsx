import { useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import axios from "axios";

import {
    saveSignature
} from "../Services/DocumentService";

pdfjs.GlobalWorkerOptions.workerSrc =
    new URL(
        "pdfjs-dist/build/pdf.worker.min.mjs",
        import.meta.url
    ).toString();

function DocumentPreview() {

    const { id } = useParams();

    const token =
        localStorage.getItem("token");

    const [signatures,
        setSignatures] =
        useState([]);

    const [position,
        setPosition] =
        useState(null);

    const pdfUrl =
        `http://localhost:8079/api/documents/download/${id}`;

    const file =
        useMemo(
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

    const loadSignatures =
        async () => {

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
                    response.data.slice(-1)
                );

            } catch (error) {

                console.log(error);
            }
        };

    const handlePdfClick =
        (event) => {

            const rect =
                event.currentTarget
                    .getBoundingClientRect();

            setPosition({
                x:
                    event.clientX -
                    rect.left,

                y:
                    event.clientY -
                    rect.top
            });
        };

    const handleSave =
        async () => {

            if (!position) {

                alert(
                    "Please select a position on PDF first"
                );

                return;
            }

            try {

                await saveSignature(
                    id,
                    position.x,
                    position.y
                );

                alert(
                    "Signature Position Saved"
                );

                loadSignatures();

            } catch (error) {

                console.log(error);
            }
        };

    return (

        <div
            style={{
                textAlign:
                    "center",
                padding:
                    "20px"
            }}
        >

            <h1>
                Document Preview
            </h1>

            <button
                onClick={
                    handleSave
                }
                style={{
                    padding:
                        "10px 20px",
                    marginBottom:
                        "20px",
                    cursor:
                        "pointer"
                }}
            >
                Save Signature
            </button>

            <div
                onClick={
                    handlePdfClick
                }
                style={{
                    position:
                        "relative",
                    display:
                        "inline-block"
                }}
            >

                <Document
                    file={file}
                    onLoadError={
                        console.error
                    }
                >
                    <Page
                        pageNumber={1}
                    />
                </Document>

                {/* Existing Saved Signatures */}

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

                {/* Current Selected Position */}

                {
                    position && (

                        <div
                            style={{
                                position:
                                    "absolute",

                                left:
                                    position.x,

                                top:
                                    position.y,

                                backgroundColor:
                                    "blue",

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
                            New Signature
                        </div>

                    )
                }

            </div>

        </div>
    );
}

export default DocumentPreview;