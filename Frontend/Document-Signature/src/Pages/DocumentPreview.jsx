import { useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import axios from "axios";
import {
    saveSignature,
    rejectDocument
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

        const [numPages, setNumPages] =
    useState(null);

    const [position,
        setPosition] =
        useState(null);


        const [signatureText,
    setSignatureText] =
    useState("");

const [fontFamily,
    setFontFamily] =
    useState("cursive");

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
        const onDocumentLoadSuccess =
    ({ numPages }) => {

        setNumPages(numPages);
    };

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

            console.log(
                "SIGNATURES =",
                response.data
            );

            setSignatures(
                response.data
            );

        } catch (error) {

            console.log(
                "SIGNATURE ERROR =",
                error
            );
        }
    };
    const handlePdfClick =
        (event,PageNumber) => {

            const rect =
                event.currentTarget
                    .getBoundingClientRect();

            setPosition({
                x:
                    event.clientX -
                    rect.left,

                y:
                    event.clientY -
                    rect.top,
                page:PageNumber
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

        if (!signatureText.trim()) {

            alert(
                "Please enter your signature name"
            );

            return;
        }

        try {

            await saveSignature(
                id,
                position.x,
                position.y,
                position.page,
                signatureText,
                fontFamily
            );

            alert(
                "Signature Saved Successfully"
            );

            loadSignatures();

        } catch (error) {

            console.log(error);

            alert(
                "Failed To Save Signature"
            );
        }
    };
        const handleReject =
    async () => {

        const confirmReject =
            window.confirm(
                "Are you sure you want to reject this document?"
            );

        if (!confirmReject) {

            return;
        }

        try {

            await rejectDocument(id);

            alert(
                "Document Rejected Successfully"
            );

            window.location.href =
                "/dashboard";

        } catch (error) {

            console.log(error);

            alert(
                "Failed To Reject Document"
            );
        }
    };

return (
    <div className="min-h-screen bg-gray-100 p-6">

        <div className="max-w-7xl mx-auto">

            <h1 className="text-4xl font-bold text-gray-800 mb-6">
                Document Preview
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                {/* LEFT PANEL */}

                <div className="lg:col-span-1">

                    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-5">

                        <h2 className="text-xl font-bold mb-5">
                            Signature Options
                        </h2>

                        <label className="block mb-2 font-semibold">
                            Full Name
                        </label>

                        <input
                            type="text"
                            value={signatureText}
                            onChange={(e) =>
                                setSignatureText(
                                    e.target.value
                                )
                            }
                            placeholder="Enter your name"
                            className="w-full border rounded-lg px-4 py-3 mb-4"
                        />

                        <label className="block mb-2 font-semibold">
                            Signature Style
                        </label>

                        <select
                            value={fontFamily}
                            onChange={(e) =>
                                setFontFamily(
                                    e.target.value
                                )
                            }
                            className="w-full border rounded-lg px-4 py-3 mb-6"
                        >
                            <option value="cursive">
                                Cursive
                            </option>

                            <option value="serif">
                                Serif
                            </option>

                            <option value="monospace">
                                Monospace
                            </option>

                            <option value="fantasy">
                                Fantasy
                            </option>
                        </select>

                        <div className="border rounded-lg p-4 mb-6 bg-gray-50">

                            <p className="text-sm text-gray-500 mb-2">
                                Signature Preview
                            </p>

                            <div
                                style={{
                                    fontFamily,
                                    fontSize: "32px"
                                }}
                            >
                                {
                                    signatureText ||
                                    "Your Signature"
                                }
                            </div>

                        </div>

                        <div className="flex flex-col gap-3">

                            <button
                                onClick={handleSave}
                                className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
                            >
                                Save Signature
                            </button>

                            <button
                                onClick={handleReject}
                                className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold"
                            >
                                Reject Document
                            </button>

                            <button
    onClick={() =>
        window.open(
            `http://localhost:8079/api/documents/download-signed/${id}`,
            "_blank"
        )
    }
    className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
>
    Download PDF
</button>

                        </div>

                    </div>

                </div>

                {/* PDF SECTION */}

                <div className="lg:col-span-3">

                    <div className="bg-white rounded-2xl shadow-lg p-6">

                        <div
                            // onClick={handlePdfClick}
                            style={{
                                position: "relative",
                                display: "inline-block"
                            }}
                        >

                            <Document
    file={file}
    onLoadSuccess={
        onDocumentLoadSuccess
    }
>
{Array.from(
    new Array(numPages),
    (el, index) => (

        <div
            key={index}
            style={{
                position: "relative",
                display: "inline-block",
                marginBottom: "20px"
            }}
            onClick={(e) =>
                handlePdfClick(
                    e,
                    index + 1
                )
            }
        >

            <Page
                pageNumber={index + 1}
            />

            {/* Signatures of current page only */}

            {signatures
                .filter(
                    sig =>
                        sig.page === index + 1
                )
                .map(
                    sig => (

                        <div
                            key={sig.id}
                            style={{
                                position: "absolute",
                                left: sig.x,
                                top: sig.y,
                                fontFamily:
                                    sig.fontFamily,
                                fontSize: "30px",
                                fontWeight: "bold",
                                color: "#111827"
                            }}
                        >
                            {sig.signatureText}
                        </div>

                    )
                )}

        </div>

    )
)}
</Document>

                            {/* SAVED SIGNATURES */}
{/* 
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

                                                fontFamily:
                                                    sig.fontFamily ||
                                                    "cursive",

                                                fontSize:
                                                    "30px",

                                                color:
                                                    "#111827",

                                                fontWeight:
                                                    "bold"
                                            }}
                                        >
                                            {
                                                sig.signatureText
                                            }
                                        </div>

                                    )
                                )
                            } */}

                            {/* CURRENT PREVIEW */}

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

                                            fontFamily,

                                            fontSize:
                                                "30px",

                                            color:
                                                "#2563eb",

                                            fontWeight:
                                                "bold"
                                        }}
                                    >
                                        {
                                            signatureText ||
                                            "Your Signature"
                                        }
                                    </div>

                                )
                            }

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>
);
}

export default DocumentPreview;