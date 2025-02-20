import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ToastContextProvider } from "../context/toastContext/ToastContext";
import { AuthContextProvider } from "../context/authContext/AuthContext";

export const renderWithWrapper = (ui: ReactNode) => {
    const Wrapper = ({ children }: { children: ReactNode }) => {
        const queryClient = new QueryClient();
        return (
            <AuthContextProvider>
                <ToastContextProvider>
                    <QueryClientProvider client={queryClient}>
                        <BrowserRouter>{children}</BrowserRouter>
                    </QueryClientProvider>
                </ToastContextProvider>
            </AuthContextProvider>
        );
    };

    return render(ui, { wrapper: Wrapper });
};
