import { Box, Button, CircularProgress, Container, Stack } from "@mui/material";
import BackgroundLogo from "../backgroundLogo/BackgroundLogo";
import { useFormContext } from "react-hook-form";
import Form from "../form/Form";
import { ReactNode } from "react";
import { AuthData } from "../../types/auth";

type AuthFormProps = {
  children: ReactNode;
  submitHandler: (data: AuthData) => void;
  submitBtnText: string;
  isPending: boolean;
};

export const submitBtnTestId = "submitBtn";
export const pendingCircleTestId = "pendingCircle"

export default function AuthForm({
  children,
  submitHandler,
  submitBtnText,
  isPending,
}: AuthFormProps) {
  const { handleSubmit } = useFormContext<AuthData>();

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
        }}
      >
        <Stack>
          <Form
            submitHandler={handleSubmit((data: AuthData) => {
              submitHandler(data);
            })}
            styles={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              px: "1rem",
            }}
          >
            {children}
            <Stack
              sx={{ alignItems: "center" }}>
              <Button
                variant="contained"
                type="submit"
                data-testid={submitBtnTestId}
                sx={{
                  maxWidth: "10rem"
                }}
              >
                <Stack sx={{ color: "white" }}>
                  {isPending ? (
                    <CircularProgress data-testid={pendingCircleTestId} size="30px" color="inherit" />
                  ) : (
                    submitBtnText
                  )}
                </Stack>
              </Button>
            </Stack>
          </Form>
        </Stack>
        <Stack>
          <BackgroundLogo />
        </Stack>
      </Box>
    </Container>
  );
}
