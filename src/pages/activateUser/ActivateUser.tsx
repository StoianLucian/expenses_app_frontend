
import { useNavigate, useParams } from 'react-router-dom'
import { UseToastContext } from '../../context/toastContext/ToastContext';
import { ToastSeverity } from '../../components/toast/Toast';
import { TEST_ID } from './__tests__/testIds.tsx';
import Message, { MessageSeverity } from '../../components/message/Message';
import { Messages } from '../../components/message/utils/utils.tsx';
import { TEXT } from '../../utils/strings.tsx';
import AuthForm from '../../components/authForm/AuthForm.tsx';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import { ROUTES } from '../../Routes/routes.tsx';
import { ArrowBack } from '@mui/icons-material';
import { useEffect } from 'react';
import { UseActivateAccount } from '../../hooks/UseActivateAccount.tsx';
import { AuthBadRequest } from '../../types/auth.tsx';
import { UseResendActivationToken } from '../../hooks/UseResendActivationToken.tsx';


export default function ActivateUser() {

    const { toastHandler } = UseToastContext();
    const navigate = useNavigate();

    const activateUserMethods = useForm<any>();

    const { token } = useParams()

    const { ActivateAccount, isError, isPending } = UseActivateAccount(token, onSuccess, onError)
    const { ResendActivationToken, isPending: activationPending, isError: activationError } = UseResendActivationToken(token, onSuccess, onError)


    //TO DO: create fixed statuses for backend on order to make handle response function

    function onSuccess(response: string) {
        toastHandler({
            message: response,
            severity: ToastSeverity.SUCCESS
        })
        navigate(ROUTES.LOGIN);
    }

    function onError(response: AuthBadRequest) {
        toastHandler({
            message: response.message,
            severity: ToastSeverity.ERROR
        })
        navigate(ROUTES.LOGIN);
    }

    useEffect(() => {
        ActivateAccount()
    }, [])

    function renderBackButton() {
        return (
            <Box sx={{ textAlign: "center" }}>
                <Button onClick={() => { navigate(ROUTES.LOGIN) }}><ArrowBack /> {TEXT.LOGIN_PAGE}</Button>
            </Box>
        )
    }

    return (
        <FormProvider {...activateUserMethods} >
            <AuthForm isPending={isPending || activationPending} submitBtnText={TEXT.SEND_ACCOUNT_ACTIVATION_EMAIL} submitHandler={() => ResendActivationToken()}>
                {isError || activationError && <Message severityType={MessageSeverity.ERROR} dataTestId={TEST_ID.ERROR} message={Messages.ERROR_ACCOUNT_ACTIVATION} />}
                {isError || activationError && renderBackButton()}
            </AuthForm>
        </FormProvider>
    )
}
