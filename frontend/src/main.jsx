import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./contexts/ContextProvider";
import { SnackbarProvider } from "notistack";
import { AuthProvider } from "./contexts/AuthProvider.jsx";
import App from "./App.jsx";
import "animate.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ContextProvider>
          <SnackbarProvider maxSnack={3}>
            <App />
          </SnackbarProvider>
        </ContextProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
