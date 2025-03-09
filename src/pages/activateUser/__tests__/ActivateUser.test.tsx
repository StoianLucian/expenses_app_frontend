import { useMutation } from "@tanstack/react-query";
import { Mock, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithWrapper } from "../../../utils/tests";
import ActivateUser from "../ActivateUser";
import { useParams } from "react-router-dom";
import { TEST_ID } from "./testIds";
import { pendingCircleTestId, submitBtnTestId } from "../../../components/authForm/AuthForm";
import userEvent from "@testing-library/user-event";

vi.mock("@tanstack/react-query", async () => {
    const actual = await vi.importActual("@tanstack/react-query");
    return {
        ...actual,
        useMutation: vi.fn(),
    };
});

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useParams: vi.fn(),
    }
})

describe("ActivateUser page", () => {
    const mockMutate = vi.fn();

    let submitBtn: HTMLButtonElement;

    const nextFrame = (pending: boolean, error: boolean, success: boolean) => {
        (useMutation as Mock).mockReturnValue({
            mutate: mockMutate,
            isPending: pending,
            isError: error,
            isSuccess: success
        });
        const { rerender } = renderWithWrapper(<ActivateUser />);
        return rerender(<ActivateUser />);
    }

    beforeEach(async () => {

        (useParams as Mock).mockReturnValue({ token: "test-token" });

        (useMutation as Mock).mockReturnValue({
            mutate: mockMutate,
            isPending: false,
            isError: false,
            isSuccess: false
        });

        renderWithWrapper(<ActivateUser />);
        submitBtn = screen.getByTestId(submitBtnTestId)

    });

    test("loading state should be displyed", async () => {

        expect(mockMutate).toHaveBeenCalledTimes(1);

        nextFrame(true, false, false);

        const pendingState = screen.getByTestId(pendingCircleTestId);

        expect(pendingState).toBeInTheDocument();
    })

    test("error state should be displayed", async () => {

        nextFrame(false, true, false);

        const errorState = screen.getByTestId(TEST_ID.ERROR);

        expect(submitBtn).toBeInTheDocument()
        expect(errorState).toBeInTheDocument();
    })
});
