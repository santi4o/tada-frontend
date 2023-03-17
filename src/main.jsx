import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import LayoutProvider from "./store/LayoutProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <LayoutProvider>
      <App />
    </LayoutProvider>
  // </React.StrictMode>
);
