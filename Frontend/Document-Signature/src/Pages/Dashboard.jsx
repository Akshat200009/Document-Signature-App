import { useEffect, useState } from "react";
import { getMyDocuments } from "../Services/DocumentService";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const [documents, setDocuments] =
        useState([]);

    const navigate =
        useNavigate();

    useEffect(() => {

        loadDocuments();

    }, []);

    const loadDocuments = async () => {

        try {

            const response =
                await getMyDocuments();

            setDocuments(
                response.data
            );

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div>

            <h1>
                My Documents
            </h1>
               <button
    onClick={() => navigate("/upload")}
>
    Upload PDF
</button>
            <table border="1">

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Filename</th>
                        <th>Status</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        documents.map(
                            (doc) => (

                                <tr key={doc.id}>

                                    <td>{doc.id}</td>

                                    <td>
                                        {doc.filename}
                                    </td>

                                    <td>
                                        {doc.status}
                                    </td>

                                    <td>

                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/preview/${doc.id}`
                                                )
                                            }
                                        >
                                            View
                                        </button>

                                    </td>

                                </tr>
                            )
                        )
                    }

                </tbody>

            </table>

        </div>
    );
}

export default Dashboard;