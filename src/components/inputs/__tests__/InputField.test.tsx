import { render, screen } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import { describe, it, expect, vi } from "vitest";
import InputField, { INPUT_FIELD_VARIANTS } from "../InputField";
import { Button } from "@mui/material";
import { ReactNode } from "react";
import userEvent from "@testing-library/user-event";
import { ERRORS, TEST_ID } from "../../../utils/strings";

const passwordLabel = "Password";

const renderWithForm = (ui: JSX.Element) => {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    const methods = useForm();

    //function created just to trigger useForm's validation
    const mockSubmitFunction = vi.fn();
    const { handleSubmit } = methods;

    return (
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(mockSubmitFunction)}>
          {children}
          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
    );
  };

  return render(ui, { wrapper: Wrapper });
};

describe("Password InputField component tests", () => {
  let submitBtn: HTMLButtonElement;
  let passwordInput: HTMLInputElement;

  beforeEach(() => {
    renderWithForm(
      <InputField
        dataName="password"
        label={passwordLabel}
        type="password"
        variant={INPUT_FIELD_VARIANTS.OUTLINED}
        required
        minPasswordLength={10}
        dataTestId={TEST_ID.PASSWORD_FIELD}
      />
    );

    submitBtn = screen.getByRole("button", { name: "Submit" });
    passwordInput = screen.getByTestId(TEST_ID.PASSWORD_FIELD);
  });

  it("accepts input for password", async () => {
    const password = "TestP@ssword123";

    await userEvent.type(passwordInput, password);

    expect(passwordInput.value).toBe(password);
  });

  it("renders input field with password label", () => {
    expect(passwordInput).toBeInTheDocument();
  });

  it("shows required error message when field is empty", async () => {
    await userEvent.click(submitBtn);

    expect(
      await screen.findByText(ERRORS.REQUIRED(passwordLabel))
    ).toBeInTheDocument();
  });

  it("shows error message when password is not 10 characters long", async () => {
    await userEvent.type(passwordInput, "lucian123");
    await userEvent.click(submitBtn);

    expect(await screen.findByText(ERRORS.MIN_LENGTH(10))).toBeInTheDocument();
  });

  it("shows error message when password doesn't contain a special character", async () => {
    await userEvent.type(passwordInput, "lucian123123123");
    await userEvent.click(submitBtn);

    expect(
      await screen.findByText(ERRORS.SPECIAL_CHARACTER)
    ).toBeInTheDocument();
  });

  it("shows error message when password doesn't contain an uppercase character", async () => {
    await userEvent.type(passwordInput, "luci@n123123123");
    await userEvent.click(submitBtn);

    expect(await screen.findByText(ERRORS.UPPERCASE)).toBeInTheDocument();
  });

  it("shows error message when password doesn't contain a lowercase character", async () => {
    await userEvent.type(passwordInput, "LUCIA@N123123123");
    await userEvent.click(submitBtn);

    expect(await screen.findByText(ERRORS.LOWERCASE)).toBeInTheDocument();
  });

  it("shows error message when password doesn't contain a number", async () => {
    await userEvent.type(passwordInput, "Luci@nasdasdasd");
    await userEvent.click(submitBtn);

    expect(await screen.findByText(ERRORS.NUMBER)).toBeInTheDocument();
  });
});
