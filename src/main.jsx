import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { WorkoutProvider } from "./contexts/WorkoutContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <WorkoutProvider>
            <App />
        </WorkoutProvider>
    </React.StrictMode>
);
