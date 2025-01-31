import { Box, Button, CircularProgress, Container, Stack } from "@mui/material";
import BackgroundLogo from "../backgroundLogo/BackgroundLogo";
import { useFormContext } from "react-hook-form";
import Form from "../form/Form";
import { ReactNode } from "react";
import { AuthData } from "../../types/auth";

type AuthFormProps<T extends AuthData> = {
  children: ReactNode;
  submitHandler: (data: T) => void;
  submitBtnText: string;
  isPending: boolean;
};

export const submitBtnTestId = "submitBtn";

export default function AuthForm<T extends AuthData>({
  children,
  submitHandler,
  submitBtnText,
  isPending,
}: AuthFormProps<T>) {
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
              submitHandler(data as T);
            })}
            styles={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              px: "1rem",
            }}
          >
            {children}
            <Button
              variant="contained"
              type="submit"
              data-testid={submitBtnTestId}
            >
              <Stack sx={{ color: "white" }}>
                {isPending ? (
                  <CircularProgress size="30px" color="inherit" />
                ) : (
                  submitBtnText
                )}
              </Stack>
            </Button>
          </Form>
        </Stack>
        <Stack>
          <BackgroundLogo />
        </Stack>
      </Box>
    </Container>
  );
}
