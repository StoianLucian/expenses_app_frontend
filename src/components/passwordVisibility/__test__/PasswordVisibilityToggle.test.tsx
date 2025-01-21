import { render, screen } from "@testing-library/react";

import { vi } from "vitest";
import { TEST_ID } from "./testIds";

import PasswordVisibilityToggle from "../PasswordVisibilityToggle";
import userEvent from "@testing-library/user-event";

describe("Password visibility component", () => {
  test("should render PasswordVisibility component", async () => {
    render(
      <PasswordVisibilityToggle visibility={true} visibilityHandler={vi.fn()} />
    );

    const visibilityButton = screen.getByTestId(TEST_ID.VISIBILITY_BUTTON);
    expect(visibilityButton).toBeInTheDocument();
  });

  test("should display VisibilityOn when visibility is set to true ", async () => {
    render(
      <PasswordVisibilityToggle visibility={true} visibilityHandler={vi.fn()} />
    );

    const visibilityOnIcon = screen.getByTestId(TEST_ID.VISIBILITY_ON_ICON);

    expect(visibilityOnIcon).toBeInTheDocument();
  });

  test("should display VisibilityOFF when visibility is set to false ", async () => {
    render(
      <PasswordVisibilityToggle
        visibility={false}
        visibilityHandler={vi.fn()}
      />
    );

    const visibilityOffIcon = screen.getByTestId(TEST_ID.VISIBILITY_OFF_ICON);
    expect(visibilityOffIcon).toBeInTheDocument();
  });

  test("should display VisibilityOFF when visibility is set to false ", async () => {
    render(
      <PasswordVisibilityToggle
        visibility={false}
        visibilityHandler={vi.fn()}
      />
    );

    const visibilityOffIcon = screen.getByTestId(TEST_ID.VISIBILITY_OFF_ICON);
    expect(visibilityOffIcon).toBeInTheDocument();
  });

  test("should call visibilityHandler", async () => {
    const visibilityHandler = vi.fn();
    const { rerender } = render(
      <PasswordVisibilityToggle
        visibility={false}
        visibilityHandler={visibilityHandler}
      />
    );

    // Simulate clicking to trigger the visibilityHandler
    const visibilityButton = screen.getByTestId(TEST_ID.VISIBILITY_BUTTON);
    await userEvent.click(visibilityButton);

    expect(visibilityHandler).toHaveBeenCalledTimes(1);

    // Rerender the component with updated props
    rerender(
      <PasswordVisibilityToggle
        visibility={true}
        visibilityHandler={visibilityHandler}
      />
    );

    // Check if visibility on icon is present when visibility is toggled
    const visibilityOnIcon = screen.getByTestId(TEST_ID.VISIBILITY_ON_ICON);
    expect(visibilityOnIcon).toBeInTheDocument();
  });
});
