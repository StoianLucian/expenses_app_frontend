import { render } from "@testing-library/react";
import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContextProvider } from "../../../context/toastContext/ToastContext";

export const renderWithWrapper = (ui: ReactNode) => {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    const queryClient = new QueryClient();
    return (
      <ToastContextProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>{children}</BrowserRouter>
        </QueryClientProvider>
      </ToastContextProvider>
    );
  };

  return render(ui, { wrapper: Wrapper });
};
