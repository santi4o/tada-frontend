import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import LayoutProvider from "./store/LayoutProvider";
import TasksProvider from "./store/TasksProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <TasksProvider>
    <LayoutProvider>
      <App />
    </LayoutProvider>
  </TasksProvider>
  // </React.StrictMode>
);
