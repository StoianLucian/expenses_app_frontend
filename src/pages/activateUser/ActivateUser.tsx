import { useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom'
import { activateUser } from '../../api/auth/users';
import { UseToastContext } from '../../context/toastContext/ToastContext';
import { ToastSeverity } from '../../components/toast/Toast';
import { AuthBadRequest } from '../../types/auth';
import { TEST_ID } from './__tests__/testIds.tsx';
import Message, { MessageSeverity } from '../../components/message/Message';
import { Messages } from '../../components/message/utils/utils.tsx';
import { TEXT } from '../../utils/strings.tsx';
import AuthForm from '../../components/authForm/AuthForm.tsx';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import { ROUTES } from '../../Routes/routes.tsx';
import { ArrowBack } from '@mui/icons-material';


export default function ActivateUser() {

    const { toastHandler } = UseToastContext();
    const navigate = useNavigate();

    const activateUserMethods = useForm<any>();

    const { token } = useParams()

    const { mutate, isPending, isError } = useMutation({
        mutationFn: async () => {
            return activateUser(token);
        },
        onSuccess: (success) => {
            toastHandler({
                message: success,
                severity: ToastSeverity.SUCCESS
            })
            navigate(ROUTES.LOGIN);
        },
        onError: (fail: AuthBadRequest) => {
            toastHandler({
                message: fail.statusCode,
                severity: ToastSeverity.ERROR,
            });
        }
    })

    function renderBackButton() {
        return (
            <Box sx={{ textAlign: "center" }}>
                <Button onClick={() => { navigate(ROUTES.LOGIN) }}><ArrowBack /> {TEXT.LOGIN_PAGE}</Button>
            </Box>

        )
    }

    function submitHandler(data: any) {
        mutate(data);
    }

    return (
        <FormProvider {...activateUserMethods} >
            <AuthForm isPending={isPending} submitBtnText={TEXT.ACTIVATE_ACCOUNT} submitHandler={submitHandler}>
                {isError && <Message severityType={MessageSeverity.ERROR} dataTestId={TEST_ID.ERROR} message={Messages.ERROR_ACCOUNT_ACTIVATION} />}
                {isError && renderBackButton()}
            </AuthForm>
        </FormProvider>
    )
}
