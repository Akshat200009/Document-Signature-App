import { useState } from "react";
import { loginUser } from "../Services/AuthService";
import { useNavigate } from "react-router-dom";

function Login() {

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const navigate =
        useNavigate();

    const handleLogin =
        async (e) => {

            e.preventDefault();

            try {

                const response =
                    await loginUser({
                        email,
                        password
                    });
                console.log(response.data);

                localStorage.setItem(
                    "token",
                    response.data.token
                );
                localStorage.setItem(
    "name",
    response.data.name
);

localStorage.setItem(
    "email",
    response.data.email
);

                navigate("/home");

            } catch (error) {

                console.log(error);
                console.log(error.response);

                alert(
                    error.response?.data ||
                    "Login Failed"
                );
            }
        };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700">

            <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">

                <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
                    Welcome Back
                </h1>

                <p className="text-center text-gray-500 mb-8">
                    Sign in to your account
                </p>

                <form
                    onSubmit={handleLogin}
                    className="space-y-5"
                >

                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-300"
                    >
                        Login
                    </button>

                </form>

                <p className="text-center mt-6 text-gray-600">

                    Don't have an account?

                    <span
                        onClick={() =>
                            navigate("/register")
                        }
                        className="text-blue-600 font-semibold cursor-pointer ml-1 hover:underline"
                    >
                        Register
                    </span>

                </p>

            </div>

        </div>
    );
}

export default Login;