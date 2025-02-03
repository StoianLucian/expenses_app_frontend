import { useMutation } from "@tanstack/react-query";
import { Mock, vi } from "vitest";
import { TEST_ID } from "../../../components/inputs/__tests__/testIds";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { submitBtnTestId } from "../../../components/authForm/AuthForm";
import { renderWithWrapper } from "./utils";
import ResetPassword from "../ResetPassword";

vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual("@tanstack/react-query");
  return {
    ...actual,
    useMutation: vi.fn(),
  };
});

describe("ResetPassword page tests", () => {
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

    renderWithWrapper(<ResetPassword />);

    emailInput = screen.getByTestId(TEST_ID.EMAIL_FIELD);
    passwordInput = screen.getByTestId(TEST_ID.PASSWORD_FIELD);
    confirmPasswordInput = screen.getByTestId(TEST_ID.CONFIRM_PASSWORD_FIELD);
    submitButton = screen.getByTestId(submitBtnTestId);
  });

  test("ForgotPassword login page", async () => {
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("Inputs accept value", async () => {
    const emailValue = "test@test.com";
    const passwordValue = "Test@19961996";

    await userEvent.type(emailInput, emailValue);
    await userEvent.type(passwordInput, passwordValue);
    await userEvent.type(confirmPasswordInput, passwordValue);

    expect(emailInput.value).toBe(emailValue);
    expect(passwordInput.value).toBe(passwordValue);
    expect(confirmPasswordInput.value).toBe(passwordValue);
  });

  test("Submit function is called with correct data", async () => {
    const emailValue = "test@test.com";
    const passwordValue = "Test@19961996";

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
