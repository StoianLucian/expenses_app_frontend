import { useMutation } from "@tanstack/react-query";
import { Mock, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithWrapper } from "../../../utils/tests";
import ActivateUser from "../ActivateUser";
import { useParams } from "react-router-dom";
import { TEST_ID } from "./testIds";

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

    beforeEach(async () => {

        (useParams as Mock).mockReturnValue({ token: "test-token" });

        (useMutation as Mock).mockReturnValue({
            mutate: mockMutate,
            isPending: false,
            isError: false,
            isSuccess: false
        });

        renderWithWrapper(<ActivateUser />);

    });


    test("loading state should be displyed", async () => {
        (useMutation as Mock).mockReturnValue({
            mutate: mockMutate,
            isPending: true,
            isError: false,
            isSuccess: false,
        });

        const { rerender } = renderWithWrapper(<ActivateUser />);
        rerender(<ActivateUser />);

        expect(screen.getByTestId(TEST_ID.LOADING)).toBeInTheDocument()
    })

    test("error state should be displyed", async () => {
        (useMutation as Mock).mockReturnValue({
            mutate: mockMutate,
            isPending: false,
            isError: true,
            isSuccess: false,
        });

        const { rerender } = renderWithWrapper(<ActivateUser />);
        rerender(<ActivateUser />);

        expect(screen.getByTestId(TEST_ID.ERROR)).toBeInTheDocument()
    })

    test("success state should be displyed", async () => {
        (useMutation as Mock).mockReturnValue({
            mutate: mockMutate,
            isPending: false,
            isError: false,
            isSuccess: true,
        });

        const { rerender } = renderWithWrapper(<ActivateUser />);
        rerender(<ActivateUser />);
        screen.debug()

        expect(screen.getByTestId(TEST_ID.SUCCESS)).toBeInTheDocument()
    })

    test("Submit function is called with correct data", async () => {
        const mockFunction = vi.fn();

        (useMutation as Mock).mockReturnValue({
            mutate: mockFunction,
            isPending: false,
            isError: false,
            isSuccess: false,
        });

        const { rerender } = renderWithWrapper(<ActivateUser />);
        rerender(<ActivateUser />)

        expect(mockFunction).toHaveBeenCalledTimes(1);
    });


});
