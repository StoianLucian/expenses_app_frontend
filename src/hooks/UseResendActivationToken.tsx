import { useMutation } from "@tanstack/react-query";
import { resendEmailActivationToken } from "../api/auth/users";
import { AuthBadRequest } from "../types/auth";

export const UseResendActivationToken = (mutationProps: string, onSuccessHandler: (response: any) => void, onErrorHandler: (response: AuthBadRequest) => void,) => {

    const { mutate: ResendActivationToken, isPending, isError } = useMutation({
        mutationFn: async () => {
            return resendEmailActivationToken(mutationProps);
        },
        onSuccess: (_success) => {
            onSuccessHandler(_success)
        },
        onError: (_fail: AuthBadRequest) => {
            // TO DO: Add after proper backend response for error case
            // onErrorHandler(_fail)
        }
    })

    return { ResendActivationToken, isPending, isError }
}