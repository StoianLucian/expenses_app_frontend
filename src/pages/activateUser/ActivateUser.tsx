import { Container, Box, Stack, CircularProgress, Button } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { activateUser } from '../../api/auth/users';
import { UseToastContext } from '../../context/toastContext/ToastContext';
import { ToastSeverity } from '../../components/toast/Toast';
import { ROUTES } from '../../Routes/routes';
import { ArrowBack } from '@mui/icons-material';
import BackgroundLogo from '../../components/backgroundLogo/BackgroundLogo';
import { AuthBadRequest } from '../../types/auth';
import { TEST_ID } from './__tests__/testIds.tsx';
import Message, { MessageSeverity } from '../../components/message/Message';
import { Messages } from '../../components/message/utils/utils.tsx';
import { TEXT } from '../../utils/strings.tsx';


export default function ActivateUser() {

    const { toastHandler } = UseToastContext();
    const navigate = useNavigate();

    const { token } = useParams()

    const { mutate, isPending, isError, isSuccess } = useMutation({
        mutationFn: async () => {
            return activateUser(token);
        },
        onSuccess: (success) => {
            toastHandler({
                message: success,
                severity: ToastSeverity.SUCCESS
            })
        },
        onError: (fail: AuthBadRequest) => {
            toastHandler({
                message: fail.statusCode,
                severity: ToastSeverity.ERROR,
            });
        }
    })

    useEffect(() => {
        mutate();
    }, [])

    return (
        <Container
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "2rem",
                    boxShadow: "0px 0px 20px 0px #847171",
                    overflow: "hidden"
                }}
            >
                <Stack sx={({
                    width: "20rem",
                    height: "20rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                })}>
                    <Stack>
                        <BackgroundLogo />
                    </Stack>
                    {isPending
                        ?
                        <CircularProgress size="50px" color="primary" data-testid={TEST_ID.LOADING} />
                        :
                        <Button onClick={() => { navigate(ROUTES.HOME) }}>
                            <ArrowBack />{TEXT.BACK_HOME}
                        </Button>
                    }
                    {isError && <Message severityType={MessageSeverity.ERROR} dataTestId={TEST_ID.ERROR} message={Messages.ERROR_ACCOUNT_ACTIVATION} />}
                    {isSuccess && <Message severityType={MessageSeverity.SUCCESS} dataTestId={TEST_ID.SUCCESS} message={Messages.SUCCESS_ACCOUNT_ACTIVATION} />}
                </Stack>
            </Box>
        </Container >
    )
}
