import { Routes, Route }
from "react-router-dom";

import Home
from "../Pages/Home";

import Login
from "../Pages/Login";

import Register
from "../Pages/Register";


import Dashboard
from "../Pages/Dashboard";

import DocumentPreview
from "../Pages/DocumentPreview";

function AppRoutes() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Home />}
            />

            <Route
                path="/dashboard"
                element={<Dashboard />}
            />

                            <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />


            <Route
                path="/preview/:id"
                element={<DocumentPreview />}
            />

        </Routes>
    );
}

export default AppRoutes;