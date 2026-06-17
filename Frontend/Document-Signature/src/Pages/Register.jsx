import { useState } from "react";
import { registerUser }
    from "../Services/AuthService";

import { useNavigate }
    from "react-router-dom";

function Register() {

    const navigate =
        useNavigate();

    const [user, setUser] =
        useState({

            name: "",
            email: "",
            password: ""
        });

    const handleChange = (e) => {

        setUser({

            ...user,
            [e.target.name]:
                e.target.value
        });
    };

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                await registerUser(user);

                alert(
                    "Registration Successful"
                );

                navigate("/login");

            } catch (error) {

                console.log(error);

                alert(
                    "Registration Failed"
                );
            }
        };

    return (

        <div>

            <h1>
                Register
            </h1>

            <form
                onSubmit={
                    handleSubmit
                }>

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={
                        handleChange
                    }
                />

                <br />
                <br />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={
                        handleChange
                    }
                />

                <br />
                <br />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={
                        handleChange
                    }
                />

                <br />
                <br />

                <button
                    type="submit">

                    Register

                </button>

            </form>

        </div>
    );
}

export default Register;