import { useState } from "react";
import axios from "axios";

function UploadDocument() {

    const [file, setFile] = useState(null);

    const handleUpload = async () => {

        if (!file) {
            alert("Select PDF First");
            return;
        }

        const formData = new FormData();

        formData.append(
            "file",
            file
        );

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await axios.post(
                    "http://localhost:8079/api/documents/upload",
                    formData,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                            "Content-Type":
                                "multipart/form-data"
                        }
                    }
                );

            alert(
                response.data
            );

        } catch (error) {

            console.log(error);

            alert(
                "Upload Failed"
            );
        }
    };

    return (

        <div
            style={{
                padding: "30px"
            }}
        >

            <h1>
                Upload PDF
            </h1>

            <input
                type="file"
                accept=".pdf"
                onChange={(e) =>
                    setFile(
                        e.target.files[0]
                    )
                }
            />

            <br />
            <br />

            <button
                onClick={
                    handleUpload
                }
            >
                Upload
            </button>

        </div>
    );
}

export default UploadDocument;