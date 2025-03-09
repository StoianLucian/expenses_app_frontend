import { useMutation } from "@tanstack/react-query";
import { activateUser } from "../api/auth/users";
import { AuthBadRequest } from "../types/auth";

type UseActivateAccountProps = {
    mutationProps: any
    onSuccessHandler: (response: any) => void,
    onErrorHandler: (response: any) => void,

}

export const UseActivateAccount = ({ mutationProps, onSuccessHandler, onErrorHandler, }: UseActivateAccountProps) => {

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