import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    const userName =
        localStorage.getItem("name");

    return (

        <div className="min-h-screen bg-gray-100">

            {/* Hero */}

            <div
                className="h-screen bg-cover bg-center relative"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1554224155-6726b3ff858f')"
                }}
            >

                <div className="absolute inset-0 bg-black/60">

                    <div className="h-full flex flex-col justify-center items-center text-center text-white px-6">

                        <h1 className="text-6xl font-bold mb-4">
                            E-Signature Platform
                        </h1>

                        <p className="text-xl mb-3">
                            Welcome Back,
                        </p>

                        <p className="text-3xl font-semibold text-blue-300 mb-8">
                            {userName}
                        </p>

                        <div className="flex gap-4">

                            <button
                                onClick={() =>
                                    navigate("/dashboard")
                                }
                                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
                            >
                                Dashboard
                            </button>

                            <button
                                onClick={() =>
                                    navigate("/upload")
                                }
                                className="bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-lg font-semibold"
                            >
                                Upload Document
                            </button>

                        </div>

                    </div>

                </div>

            </div>

            {/* Features */}

            <div className="max-w-7xl mx-auto py-20 px-6">

                <h2 className="text-4xl font-bold text-center mb-12">
                    Platform Features
                </h2>

                <div className="grid md:grid-cols-3 gap-8">

                    <div className="bg-white p-8 rounded-xl shadow">
                        <h3 className="text-2xl font-bold mb-4">
                            📄 Upload PDFs
                        </h3>

                        <p>
                            Upload documents securely
                            and manage signatures.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow">
                        <h3 className="text-2xl font-bold mb-4">
                            ✍ Digital Signing
                        </h3>

                        <p>
                            Collect signatures from
                            multiple users instantly.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow">
                        <h3 className="text-2xl font-bold mb-4">
                            🔒 Secure Access
                        </h3>

                        <p>
                            JWT authentication and
                            secure document sharing.
                        </p>
                    </div>

                </div>

            </div>

            {/* CTA */}

            <div className="max-w-6xl mx-auto pb-20 px-6">

                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-12 rounded-3xl text-center">

                    <h2 className="text-4xl font-bold mb-4">
                        Ready To Start?
                    </h2>

                    <p className="mb-8 text-lg">
                        Upload, share and sign documents
                        in seconds.
                    </p>

                    <button
                        onClick={() =>
                            navigate("/upload")
                        }
                        className="bg-white text-black px-8 py-3 rounded-lg font-semibold"
                    >
                        Upload Now
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Home;