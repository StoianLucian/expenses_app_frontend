import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/authContext/AuthContext.tsx";
import { ToastContextProvider } from "./context/toastContext.tsx/ToastContext.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <ToastContextProvider>
            <App />
          </ToastContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);