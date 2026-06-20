import React from "react";
import ReactDOM from "react-dom/client";
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

import { BrowserRouter }
from "react-router-dom";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(
    document.getElementById("root")
).render(

    <BrowserRouter>

        <App />

    </BrowserRouter>
);