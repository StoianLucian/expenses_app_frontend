import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

export const renderWithWrapper = (ui: ReactNode) => {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    const queryClient = new QueryClient();
    return (
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </BrowserRouter>
    );
  };

  return render(ui, { wrapper: Wrapper });
};
