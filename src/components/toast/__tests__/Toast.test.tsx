import { render, screen } from "@testing-library/react";
import Toast from "../Toast";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

const toastMessage = "toast message";
const delay = 1000;
const mockCloseHandler = vi.fn();

describe("Toast component tests", () => {
  test("renders toast component when isOpen is set true", () => {
    render(
      <Toast
        isOpen={true}
        closeHandler={mockCloseHandler}
        message={toastMessage}
      />
    );

    expect(screen.getByText(toastMessage)).toBeInTheDocument();
  });

  test("toast is hidden when isOpen is set false", () => {
    render(
      <Toast
        isOpen={false}
        closeHandler={mockCloseHandler}
        message={toastMessage}
      />
    );

    expect(screen.queryByText(toastMessage)).not.toBeInTheDocument();
  });

  test("calls closeHandler after the timer expires", () => {
    vi.useFakeTimers();

    render(
      <Toast
        isOpen={true}
        closeHandler={mockCloseHandler}
        message={toastMessage}
        closeDelay={delay}
      />
    );
    vi.advanceTimersByTime(delay);

    expect(mockCloseHandler).toHaveBeenCalled();
  });

  test("calls closeHandler when clicking close button", () => {
    render(
      <Toast
        isOpen={true}
        closeHandler={mockCloseHandler}
        message={toastMessage}
      />
    );

    const closeButton = screen.getByTestId("CloseIcon");
    userEvent.click(closeButton);

    expect(mockCloseHandler).toHaveBeenCalled();
  });
});
