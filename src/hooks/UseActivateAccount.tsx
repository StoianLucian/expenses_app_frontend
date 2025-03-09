import { useMutation } from "@tanstack/react-query";
import { activateUser } from "../api/auth/users";
import { AuthBadRequest } from "../types/auth";

export const UseActivateAccount = (mutationProps: string | undefined, onSuccessHandler: (response: any) => void, onErrorHandler: (response: AuthBadRequest) => void,) => {

    const { mutate: ActivateAccount, isPending, isError } = useMutation({
        mutationFn: async () => {
            return activateUser(mutationProps);
        },
        onSuccess: (_success) => {
            onSuccessHandler(_success)
        },
        onError: (_fail: AuthBadRequest) => {
            onErrorHandler(_fail)
        }
    })

    return { ActivateAccount, isPending, isError }
}