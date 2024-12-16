import { fireEvent, render, screen } from "@testing-library/react";
import Register from "../Register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";

describe("Register Component", () => {
  beforeEach(() => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Register />
      </QueryClientProvider>
    );
  });

  it("should render the register form", () => {
    const emailInput = screen.getByPlaceholderText("email address");

    fireEvent.change(emailInput, { target: { value: "test" } });

    const signUpButton = screen.getByText("Sign up");

    fireEvent.click(signUpButton);

    // Check if the form elements are rendered
    expect(screen.getByPlaceholderText("email address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("confirm password")).toBeInTheDocument();
    expect(screen.getByText("Sign up")).toBeInTheDocument();
  });

  it("should show error message for missing email value", async () => {
    const emailInput = screen.getByPlaceholderText("email address");

    await userEvent.type(emailInput, " ");

    const button = screen.getByText("Sign up");

    await userEvent.click(button);

    expect(screen.getByText("email field is required")).toBeInTheDocument();

    screen.debug();
  });

  it("should show error message for missing password value", async () => {
    const emailInput = screen.getByPlaceholderText("email address");
    // const passwordInput = screen.getByPlaceholderText("password");

    await userEvent.type(emailInput, "email@test.com");


    const button = screen.getByText("Sign up");

    await userEvent.click(button);

    expect(screen.getByText("password field is required")).toBeInTheDocument();

    screen.debug();
  });
});
