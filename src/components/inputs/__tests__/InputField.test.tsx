import { render, screen, fireEvent } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import { describe, it, expect } from "vitest";
import InputField, { INPUT_FIELD_VARIANTS } from "../InputField";
import { Button } from "@mui/material";
import { ReactNode } from "react";
import userEvent from "@testing-library/user-event";

const renderWithForm = (ui: JSX.Element) => {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    const methods = useForm();

    //function created just to trigger useForm's validation
    const mockSubmitFunction = (data: any) => {
      console.log(data); //
    };
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
        label="Password"
        type="password"
        variant={INPUT_FIELD_VARIANTS.OUTLINED}
        required
        minPasswordLength={10}
      />
    );

    submitBtn = screen.getByText("Submit");
    passwordInput = screen.getByPlaceholderText("Password");
  });
  it("renders input field with password label", () => {
    expect(passwordInput).toBeInTheDocument();
  });

  it("shows required error message when field is empty", async () => {
    await userEvent.click(submitBtn);

    expect(await screen.findByText("Password is required")).toBeInTheDocument();
  });

  it("shows error message when password is not 10 characters long", async () => {
    await userEvent.type(passwordInput, "lucian123");
    await userEvent.click(submitBtn);

    expect(
      await screen.findByText("Password must be at least 10 characters long")
    ).toBeInTheDocument();
  });

  it("shows error message whe password doesn't contain a special character", async () => {
    await userEvent.type(passwordInput, "lucian123123123");
    await userEvent.click(submitBtn);
    screen.debug();
    expect(
      await screen.findByText(
        "Password must contain at least one special character"
      )
    ).toBeInTheDocument();
  });

  it("shows error message whe password doesn't contain a special character", async () => {
    await userEvent.type(passwordInput, "luci@n123123123");
    await userEvent.click(submitBtn);
    screen.debug();
    expect(
      await screen.findByText(
        "Password must contain at least one upper case character"
      )
    ).toBeInTheDocument();
  });

  it("shows error message whe password doesn't contain a special character", async () => {
    await userEvent.type(passwordInput, "LUCIA@N123123123");
    await userEvent.click(submitBtn);
    screen.debug();
    expect(
      await screen.findByText(
        "Password must contain at least one lower case character"
      )
    ).toBeInTheDocument();
  });
});
