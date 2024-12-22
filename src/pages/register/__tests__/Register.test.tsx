import { fireEvent, render, screen } from "@testing-library/react";
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

  beforeAll(() => {
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

    emailInput = screen.getByPlaceholderText("email");
    passwordInput = screen.getByPlaceholderText("password");
    confirmPasswordInput = screen.getByPlaceholderText("confirm password");
    signUpBtn = screen.getByText("Sign up");
  });

  it("should render the register form", () => {
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(signUpBtn).toBeInTheDocument();

    screen.debug()
  });

  // it("should show error message for missing email value", async () => {
  //   const emailInput = screen.getByPlaceholderText("email address");

  //   await userEvent.type(emailInput, " ");

  //   const button = screen.getByText("Sign up");

  //   await userEvent.click(button);

  //   expect(screen.getByText("email field is required")).toBeInTheDocument();

  //   screen.debug();
  // });

  // it("should show error message for missing password value", async () => {
  //   const emailInput = screen.getByPlaceholderText("email address");
  //   // const passwordInput = screen.getByPlaceholderText("password");

  //   await userEvent.type(emailInput, "email@test.com");

  //   const button = screen.getByText("Sign up");

  //   await userEvent.click(button);

  //   expect(screen.getByText("password field is required")).toBeInTheDocument();

  //   screen.debug();
  // });
});
