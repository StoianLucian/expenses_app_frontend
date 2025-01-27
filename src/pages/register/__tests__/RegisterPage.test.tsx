import { act, render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import { TEST_ID } from "../../../components/inputs/__tests__/testIds";
import { vi, Mock } from "vitest";
import { ToastContextProvider } from "../../../context/toastContext/ToastContext";
import RegisterPage from "../RegisterPage";
import userEvent from "@testing-library/user-event";

// import the package so we can mock the UseMutation function
vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual("@tanstack/react-query");
  return {
    ...actual, // Preserve all original exports
    useMutation: vi.fn(), // Mock only `useMutation`
  };
});

const RenderWithWrapper = (ui: ReactNode) => {
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

describe("Register page tests", () => {
  let emailInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;
  let confirmPasswordInput: HTMLInputElement;
  let submitButton: HTMLButtonElement;

  const mockMutate = vi.fn();

  beforeEach(async () => {
    // Mock the useMutation return value
    (useMutation as Mock).mockReturnValue({
      mutate: mockMutate, // Use the mocked function
      isPending: false,
    });

    RenderWithWrapper(<RegisterPage />);

    emailInput = screen.getByTestId(TEST_ID.EMAIL_FIELD);
    passwordInput = screen.getByTestId(TEST_ID.PASSWORD_FIELD);
    confirmPasswordInput = screen.getByTestId(TEST_ID.CONFIRM_PASSWORD_FIELD);
    submitButton = screen.getByRole("button", { name: "Sign up" });
  });

  test("Render register page", async () => {
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("Inputs accept value", async () => {
    const emailValue = "test@test.com";
    const passwordValue = "testpassword";

    await userEvent.type(emailInput, emailValue);
    await userEvent.type(passwordInput, passwordValue);
    await userEvent.type(confirmPasswordInput, passwordValue);

    expect(emailInput.value).toBe(emailValue);
    expect(passwordInput.value).toBe(passwordValue);
    expect(confirmPasswordInput.value).toBe(passwordValue);
  });

  test("Submit function is called with correct data", async () => {
    const emailValue = "test@test.com";
    const passwordValue = "@Dmin123123";

    // Fill the inputs
    await userEvent.type(emailInput, emailValue);
    await userEvent.type(passwordInput, passwordValue);
    await userEvent.type(confirmPasswordInput, passwordValue);

    // Click the submit button
    await userEvent.click(submitButton);

    expect(mockMutate).toHaveBeenCalledTimes(1);
    expect(mockMutate).toHaveBeenCalledWith({
      email: emailValue,
      password: passwordValue,
      confirmPassword: passwordValue,
    });
  });
});
