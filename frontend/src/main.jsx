import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider.jsx";
import { ContextProvider } from "./contexts/ContextProvider";
import { SnackbarProvider } from "notistack";
import App from "./App.jsx";
import "./index.css";
import "animate.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3}>
      <BrowserRouter>
        <AuthProvider>
          <ContextProvider>
            <App />
          </ContextProvider>
        </AuthProvider>
      </BrowserRouter>
    </SnackbarProvider>
  </React.StrictMode>
);
