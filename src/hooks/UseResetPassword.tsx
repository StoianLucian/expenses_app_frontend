import { useMutation } from "@tanstack/react-query";
import { resetForgotPassword } from "../api/auth/users";
import { AuthBadRequest, AuthSuccessRequest, ResetForgotPasswordData } from "../types/auth";

export const UseResetPassword = (token: string, onSuccessHandler: (response: AuthSuccessRequest) => void, onErrorHandler: (response: AuthBadRequest) => void) => {

    const { mutate: resetPassword, isPending, isError } = useMutation({
        mutationFn: async (data: ResetForgotPasswordData) => {
            return resetForgotPassword(data, token);
        },
        onSuccess: (_success: AuthSuccessRequest) => {
            onSuccessHandler(_success)
        },
        onError: (_fail: AuthBadRequest) => {
            onErrorHandler(_fail)
        }
    })

    return { resetPassword, isPending, isError }
}