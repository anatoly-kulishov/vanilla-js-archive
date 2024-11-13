import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
    // {/* TODO(2.3 Были не те скобки) */}
    // <React.StrictMode>
    <App/>
    // </React.StrictMode>
);
