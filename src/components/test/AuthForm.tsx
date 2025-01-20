import { Box, Button, CircularProgress, Container, Stack } from "@mui/material";
import BackgroundLogo from "../backgroundLogo/BackgroundLogo";
import { useFormContext } from "react-hook-form";
import Form from "../form/Form";
import { ReactNode } from "react";
import { LoginData, RegisterData } from "../../types/auth";

type AuthFormProps = {
  children: ReactNode;
  submitHandler: (data: RegisterData | LoginData) => void;
  submitBtnText: string;
  isPending: boolean;
};

export default function AuthForm({
  children,
  submitHandler,
  submitBtnText,
  isPending,
}: AuthFormProps) {
  const { handleSubmit } = useFormContext<RegisterData | LoginData>();

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
          boxShadow: "0px 0px 20px 0px #847171",
        }}
      >
        <Stack>
          <Form
            submitHandler={handleSubmit((data: RegisterData | LoginData) => {
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

            <Button variant="contained" type="submit" data-testid="submitBtn">
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
