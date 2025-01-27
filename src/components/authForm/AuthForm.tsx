import { Box, Button, CircularProgress, Container, Stack } from "@mui/material";
import BackgroundLogo from "../backgroundLogo/BackgroundLogo";
import { useFormContext } from "react-hook-form";
import Form from "../form/Form";
import { ReactNode } from "react";
import { ForgotPasswordData, LoginData, RegisterData } from "../../types/auth";
import { UseWidth } from "../../customHooks/UseWidth";

type AuthFormProps = {
  children: ReactNode;
  submitHandler: (data: any) => void;
  submitBtnText: string;
  isPending: boolean;
  isDisabled: boolean;
};

export const btnTestId = "submitBtn";

export default function AuthForm({
  children,
  submitHandler,
  submitBtnText,
  isPending,
  isDisabled,
}: AuthFormProps) {
  const { handleSubmit } = useFormContext<
    RegisterData | LoginData | ForgotPasswordData
  >();

  const { isMobile } = UseWidth();

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
            submitHandler={handleSubmit(
              (data: RegisterData | LoginData | ForgotPasswordData) => {
                submitHandler(data);
              }
            )}
            styles={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              px: "1rem",
            }}
          >
            {children}
            <Button variant="contained" type="submit" disabled={isDisabled}>
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
        <Stack>{!isMobile() && <BackgroundLogo />}</Stack>
      </Box>
    </Container>
  );
}
