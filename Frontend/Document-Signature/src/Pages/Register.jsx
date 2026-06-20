import { useState } from "react";
import { registerUser } from "../Services/AuthService";
import { useNavigate } from "react-router-dom";

function Register() {

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [confirmPassword,
        setConfirmPassword] =
        useState("");

    const navigate =
        useNavigate();

    const handleRegister =
        async (e) => {

            e.preventDefault();

            if (
                password !==
                confirmPassword
            ) {

                alert(
                    "Passwords do not match"
                );

                return;
            }

            try {

                await registerUser({
                    name,
                    email,
                    password
                });

                alert(
                    "Register Successful"
                );

                navigate("/login");

            } catch (error) {

                console.log(error);

                alert(
                    error.response?.data ||
                    "Registration Failed"
                );
            }
        };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-blue-700">

            <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">

                <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
                    Create Account
                </h1>

                <p className="text-center text-gray-500 mb-8">
                    Register to continue
                </p>

                <form
                    onSubmit={handleRegister}
                    className="space-y-5"
                >

                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) =>
                            setName(
                                e.target.value
                            )
                        }
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

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

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(
                                e.target.value
                            )
                        }
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition duration-300"
                    >
                        Register
                    </button>

                </form>

                <p className="text-center mt-6 text-gray-600">

                    Already have an account?

                    <span
                        onClick={() =>
                            navigate("/login")
                        }
                        className="text-blue-600 font-semibold cursor-pointer ml-1 hover:underline"
                    >
                        Login
                    </span>

                </p>

            </div>

        </div>
    );
}

export default Register;