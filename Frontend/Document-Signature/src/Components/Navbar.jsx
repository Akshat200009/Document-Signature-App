import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const userName =
        localStorage.getItem("name");

    const handleLogout = () => {

        localStorage.clear();

        navigate("/login");
    };

    return (

        <nav className="bg-white shadow-md px-8 py-4">

            <div className="max-w-7xl mx-auto flex justify-between items-center">

                <h1 className="text-4xl font-bold text-blue-600 cursor-pointer"
                    onClick={() => navigate("/dashboard")}
                >
                    E-Signature
                </h1>

                <div className="flex items-center gap-6">
                    <button
                        onClick={() => navigate("/Home")}
                        className="text-gray-700 hover:text-blue-600 font-medium"
                    >
                        Home
                    </button>

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="text-gray-700 hover:text-blue-600 font-medium"
                    >
                        Dashboard
                    </button>

                    <button
                        onClick={() => navigate("/upload")}
                        className="text-gray-700 hover:text-blue-600 font-medium"
                    >
                        Upload
                    </button>

                    <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
                        👤 {userName}
                    </div>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;