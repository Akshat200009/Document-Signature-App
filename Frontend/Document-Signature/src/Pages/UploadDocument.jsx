import { useState } from "react";
import { useRef } from "react";
import { uploadDocument } from "../Services/DocumentService";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

function UploadDocument() {

    const [file, setFile] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const navigate =
        useNavigate();

    const handleFileChange =
        (e) => {

            setFile(
                e.target.files[0]
            );
        };
        const fileInputRef =
    useRef();
      const removeFile = () => {

    setFile(null);

    if (fileInputRef.current) {

        fileInputRef.current.value = "";
    }
};

    const handleUpload =
        async () => {

            if (!file) {

                alert(
                    "Please select a PDF"
                );

                return;
            }

            try {

                setLoading(true);

                const formData =
                    new FormData();

                formData.append(
                    "file",
                    file
                );

                await uploadDocument(
                    formData
                );

                alert(
                    "Document Uploaded Successfully"
                );

                navigate(
                    "/dashboard"
                );

            } catch (error) {

                console.log(error);

                alert(
                    "Upload Failed"
                );

            } finally {

                setLoading(false);
            }
        };

    return (

        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100 py-10 px-6">

                <div className="max-w-4xl mx-auto">

                    <div className="bg-white rounded-3xl shadow-lg p-10">

                        <h1 className="text-4xl font-bold text-gray-800 mb-2">
                            Upload Document
                        </h1>
                        <button
    onClick={removeFile}
    className="bg-red-500 text-white px-4 py-2 rounded"
>
    Remove
</button>

                        <p className="text-gray-500 mb-8">
                            Upload your PDF document and prepare it for digital signatures.
                        </p>

                        {/* Upload Area */}

                        <div className="border-2 border-dashed border-blue-400 bg-blue-50 rounded-2xl p-12 text-center">

                            <input
                                type="file"
                                accept=".pdf"
                                id="pdfFile"
                                 ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                            />

                            <label
                                htmlFor="pdfFile"
                                className="cursor-pointer"
                            >

                                <div className="text-7xl mb-4">
                                    📄
                                </div>

                                <h2 className="text-2xl font-semibold text-gray-700">
                                    Select PDF File
                                </h2>

                                <p className="text-gray-500 mt-2">
                                    Click here to browse
                                </p>

                            </label>

                        </div>

                        {/* File Preview */}

                        {file && (

                            <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-5">

                                <h3 className="font-semibold text-green-700 mb-2">
                                    Selected File
                                </h3>

                                <p className="text-gray-700">
                                    {file.name}
                                </p>

                                <p className="text-sm text-gray-500 mt-1">
                                    {(file.size / 1024).toFixed(2)} KB
                                </p>

                            </div>

                        )}

                        {/* Upload Button */}

                        <button
                            onClick={handleUpload}
                            disabled={loading}
                            className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold shadow-md transition"
                        >

                            {
                                loading
                                    ? "Uploading..."
                                    : "Upload Document"
                            }

                        </button>

                        {/* Info Cards */}

                        <div className="grid md:grid-cols-3 gap-4 mt-10">

                            <div className="bg-gray-50 p-5 rounded-xl">

                                <h3 className="font-bold text-blue-600 mb-2">
                                    Secure
                                </h3>

                                <p className="text-sm text-gray-600">
                                    Documents are protected using JWT authentication.
                                </p>

                            </div>

                            <div className="bg-gray-50 p-5 rounded-xl">

                                <h3 className="font-bold text-green-600 mb-2">
                                    Fast
                                </h3>

                                <p className="text-sm text-gray-600">
                                    Upload and prepare documents within seconds.
                                </p>

                            </div>

                            <div className="bg-gray-50 p-5 rounded-xl">

                                <h3 className="font-bold text-purple-600 mb-2">
                                    Digital Signing
                                </h3>

                                <p className="text-sm text-gray-600">
                                    Send documents for secure electronic signatures.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>
    );
}

export default UploadDocument;