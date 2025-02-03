import { useMutation } from "@tanstack/react-query";
import { Mock, vi } from "vitest";
import { TEST_ID } from "../../../components/inputs/__tests__/testIds";
import { screen } from "@testing-library/react";
import { renderWithWrapper } from "./utils";
import LoginPage from "../LoginPage";
import userEvent from "@testing-library/user-event";
import { submitBtnTestId } from "../../../components/authForm/AuthForm";

vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual("@tanstack/react-query");
  return {
    ...actual,
    useMutation: vi.fn(),
  };
});

describe("Login page tests", () => {
  let emailInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;
  let submitButton: HTMLButtonElement;

  const mockMutate = vi.fn();

  beforeEach(async () => {
    // Mock the useMutation return value
    (useMutation as Mock).mockReturnValue({
      mutate: mockMutate, // Use the mocked function
      isPending: false,
    });

    renderWithWrapper(<LoginPage />);

    emailInput = screen.getByTestId(TEST_ID.EMAIL_FIELD);
    passwordInput = screen.getByTestId(TEST_ID.PASSWORD_FIELD);
    submitButton = screen.getByTestId(submitBtnTestId);
  });

  test("Render login page", async () => {
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("Inputs accept value", async () => {
    const emailValue = "test@test.com";
    const passwordValue = "testpassword";

    await userEvent.type(emailInput, emailValue);
    await userEvent.type(passwordInput, passwordValue);

    expect(emailInput.value).toBe(emailValue);
    expect(passwordInput.value).toBe(passwordValue);
  });

  test("Submit function is called with correct data", async () => {
    const emailValue = "test@test.com";
    const passwordValue = "@Dmin123123";

    // Fill the inputs
    await userEvent.type(emailInput, emailValue);
    await userEvent.type(passwordInput, passwordValue);

    // Click the submit button
    await userEvent.click(submitButton);

    expect(mockMutate).toHaveBeenCalledTimes(1);
    expect(mockMutate).toHaveBeenCalledWith({
      email: emailValue,
      password: passwordValue,
    });
  });
});
