import { ReactNode } from "react";
import { ToastContextProvider } from "../../../context/toastContext/ToastContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { AuthContextProvider } from "../../../context/authContext/AuthContext";
import { BrowserRouter } from "react-router-dom";

export const renderWithWrapper = (ui: ReactNode) => {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    const queryClient = new QueryClient();
    return (
      <AuthContextProvider>
        <ToastContextProvider>
          <BrowserRouter>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </BrowserRouter>
        </ToastContextProvider>
      </AuthContextProvider>
    );
  };

  return render(ui, { wrapper: Wrapper });
};
