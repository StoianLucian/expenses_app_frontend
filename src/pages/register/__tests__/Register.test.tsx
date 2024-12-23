import { render, screen } from "@testing-library/react";
import Register from "../Register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { ToastContextProvider } from "../../../context/toastContext.tsx/ToastContext";

describe("Register Component", () => {
  let emailInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;
  let confirmPasswordInput: HTMLInputElement;
  let signUpBtn: HTMLButtonElement;

  beforeEach(() => {
    const queryClient = new QueryClient();
    render(
      <ToastContextProvider>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <Register />
          </QueryClientProvider>
        </BrowserRouter>
      </ToastContextProvider>
    );

    emailInput = screen.getByPlaceholderText("Email");
    passwordInput = screen.getByPlaceholderText("Password");
    confirmPasswordInput = screen.getByPlaceholderText("Confirm password");
    signUpBtn = screen.getByTestId("submitBtn");
  });

  it("should render the register form", () => {
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(signUpBtn).toBeInTheDocument();
  });

  it("should show error messages for missing email, password and confirm password values", async () => {
    await userEvent.click(signUpBtn);
    const emailError = screen.getByText("Email is required");
    const passwordError = screen.getByText("Password is required");
    const confirmPassword = screen.getByText("Confirm password is required");

    expect(emailError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
    expect(confirmPassword).toBeInTheDocument();
  });

  it("should show error message when entering only space", async () => {
    await userEvent.type(emailInput, " ");

    await userEvent.click(signUpBtn);

    const emailError = screen.getByText("Email is required");

    expect(emailError).toBeInTheDocument();
  });

  it("should show error message when passwords do not match", async () => {
    await userEvent.type(emailInput, "test@email.com");

    await userEvent.type(passwordInput, "password123");

    await userEvent.type(confirmPasswordInput, "password");

    await userEvent.click(signUpBtn);

    const noMatchPasswords = screen.getByText("Passwords do not match");

    expect(noMatchPasswords).toBeInTheDocument();
  });

  it("should show error message when passwords do not match", async () => {
    await userEvent.type(emailInput, "test@email.com");

    await userEvent.type(passwordInput, "password123");

    await userEvent.type(confirmPasswordInput, "password123");

    await userEvent.click(signUpBtn);
  });
});
