
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


export default function ActivateUser() {

    const { toastHandler } = UseToastContext();
    const navigate = useNavigate();

    const activateUserMethods = useForm<any>();

    const { token } = useParams()

    const { ActivateAccount, isError, isPending } = UseActivateAccount({ mutationProps: token, onSuccessHandler: onSuccess, onErrorHandler: onError })

    function onSuccess(response: string) {
        toastHandler({
            message: response,
            severity: ToastSeverity.SUCCESS
        })
        navigate(ROUTES.LOGIN);
    }

    function onError(response: string) {
        toastHandler({
            message: response,
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

    // function submitHandler(data: any) {
    //     activateAccount(data);
    // }

    return (
        <FormProvider {...activateUserMethods} >
            <AuthForm isPending={isPending} submitBtnText={TEXT.SEND_ACCOUNT_ACTIVATION_EMAIL} submitHandler={() => { }}>
                {isError && <Message severityType={MessageSeverity.ERROR} dataTestId={TEST_ID.ERROR} message={Messages.ERROR_ACCOUNT_ACTIVATION} />}
                {isError && renderBackButton()}
            </AuthForm>
        </FormProvider>
    )
}
