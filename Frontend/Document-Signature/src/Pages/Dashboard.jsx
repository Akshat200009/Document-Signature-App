import { useEffect, useState } from "react";
import {
    getMyDocuments,
    sendSigningLink,
       deleteDocument
} from "../Services/DocumentService";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

function Dashboard() {
    const [documents, setDocuments] = useState([]);
    const [filter, setFilter] = useState("ALL");
    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        loadDocuments();
    }, []);

    const loadDocuments = async () => {
        try {
            const response = await getMyDocuments();
            setDocuments(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    const handleSendEmail =
    async (documentId) => {

        const email =
            prompt(
                "Enter Signer Email"
            );

        if (!email) {

            return;
        }

        try {

            await sendSigningLink(
                documentId,
                email
            );

            alert(
                "Signing Link Sent Successfully"
            );

        } catch (error) {

            console.log(error);

            alert(
                "Failed To Send Email"
            );
        }
    };
    const handleDelete =
    async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this document?"
            );

        if (!confirmDelete) {

            return;
        }

        try {

            await deleteDocument(
                id
            );

            alert(
                "Document Deleted Successfully"
            );

            loadDocuments();

        } catch (error) {

            console.log(error);

            alert(
                "Delete Failed"
            );
        }
    };

    const filteredDocuments = documents.filter((doc) => {
        const statusMatch =
            filter === "ALL" || doc.status === filter;

        const searchMatch =
            doc.filename
                ?.toLowerCase()
                .includes(search.toLowerCase());

        return statusMatch && searchMatch;
    });

    const totalDocuments = documents.length;

    const signedCount = documents.filter(
        (doc) => doc.status === "SIGNED"
    ).length;

    const pendingCount = documents.filter(
        (doc) => doc.status === "PENDING"
    ).length;

    const rejectedCount = documents.filter(
        (doc) => doc.status === "REJECTED"
    ).length;

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100 p-6 md:p-8">
                <div className="max-w-7xl mx-auto">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                        <h1 className="text-5xl font-bold text-gray-800 mb-4 md:mb-0">
                            My Documents
                        </h1>

                        <button
                            onClick={() => navigate("/upload")}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg transition"
                        >
                            Upload PDF
                        </button>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

                        <div className="bg-white p-6 rounded-2xl shadow">
                            <p className="text-gray-500 text-lg">
                                Total Documents
                            </p>
                            <h2 className="text-4xl font-bold text-gray-800 mt-2">
                                {totalDocuments}
                            </h2>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow">
                            <p className="text-green-600 font-semibold text-lg">
                                Signed
                            </p>
                            <h2 className="text-4xl font-bold text-green-700 mt-2">
                                {signedCount}
                            </h2>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow">
                            <p className="text-yellow-600 font-semibold text-lg">
                                Pending
                            </p>
                            <h2 className="text-4xl font-bold text-yellow-700 mt-2">
                                {pendingCount}
                            </h2>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow">
                            <p className="text-red-600 font-semibold text-lg">
                                Rejected
                            </p>
                            <h2 className="text-4xl font-bold text-red-700 mt-2">
                                {rejectedCount}
                            </h2>
                        </div>

                    </div>

                    {/* Search + Filter */}
                    <div className="flex flex-col md:flex-row gap-4 mb-8">

                        <input
                            type="text"
                            placeholder="Search documents..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            className="w-full md:w-96 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <select
                            value={filter}
                            onChange={(e) =>
                                setFilter(e.target.value)
                            }
                            className="w-full md:w-56 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="ALL">
                                All Documents
                            </option>

                            <option value="PENDING">
                                Pending
                            </option>

                            <option value="SIGNED">
                                Signed
                            </option>

                            <option value="REJECTED">
                                Rejected
                            </option>
                        </select>

                    </div>

                    {/* Documents Table */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead className="bg-gray-200">
                                    <tr>
                                        <th className="text-left p-5">
                                            ID
                                        </th>

                                        <th className="text-left p-5">
                                            Filename
                                        </th>

                                        <th className="text-left p-5">
                                            Status
                                        </th>

                                        <th className="text-left p-5">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {filteredDocuments.length > 0 ? (

                                        filteredDocuments.map((doc) => (

                                            <tr
                                                key={doc.id}
                                                className="border-b hover:bg-gray-50 transition"
                                            >

                                                <td className="p-5">
                                                    {doc.id}
                                                </td>

                                                <td className="p-5 font-medium">
                                                    {doc.filename}
                                                </td>

                                                <td className="p-5">

                                                    <span
                                                        className={`px-4 py-2 rounded-full text-xs font-bold uppercase ${
                                                            doc.status ===
                                                            "SIGNED"
                                                                ? "bg-green-100 text-green-700"
                                                                : doc.status ===
                                                                  "PENDING"
                                                                ? "bg-yellow-100 text-yellow-700"
                                                                : "bg-red-100 text-red-700"
                                                        }`}
                                                    >
                                                        {doc.status}
                                                    </span>

                                                </td>
<td className="p-5">

    <div className="flex gap-2">

        <button
            onClick={() =>
                navigate(
                    `/preview/${doc.id}`
                )
            }
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
        >
            View
        </button>

        <button
            onClick={() =>
                handleSendEmail(
                    doc.id
                )
            }
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
        >
            Send Email
        </button>
        <button
    onClick={() =>
        handleDelete(
            doc.id
        )
    }
    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
>
    Delete
</button>

    </div>

</td>

                                            </tr>

                                        ))
                                    ) : (

                                        <tr>

                                            <td
                                                colSpan="4"
                                                className="text-center p-10 text-gray-500"
                                            >
                                                No Documents Found
                                            </td>

                                        </tr>

                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>
            </div>
        </>
    );
}

export default Dashboard;