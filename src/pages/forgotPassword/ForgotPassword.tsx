import { Link, useNavigate } from "react-router-dom";
import BackgroundLogo from "../../components/backgroundLogo/BackgroundLogo";
import Logo from "../../components/logo/Logo";
import styles from "./ForgotPassword.module.scss";

import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { sendForgotPasswordEmail } from "../../api/auth/users";
import InputField, {
  INPUT_FIELD_VARIANTS,
} from "../../components/Inputs/InputField";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import {
  TOAST_SEVERITY,
  TOAST_VARIANT,
  UseToastContext,
} from "../../context/toastContext.tsx/ToastContext";
import { ROUTES } from "../../Routes/routes";

type FormData = {
  email: string;
};

export default function ForgotPassword() {
  const formMethods = useForm<FormData>();
  const { toastHandler } = UseToastContext();
  const navigate = useNavigate();

  const { handleSubmit, reset } = formMethods;

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => sendForgotPasswordEmail(data),
    onSuccess: (success) => {
      toastHandler(
        TOAST_VARIANT.FILLED,
        TOAST_SEVERITY.SUCCESS,
        success.message
      );
      navigate(ROUTES.LOGIN);
    },
    onError: (fail) => {
      toastHandler(TOAST_VARIANT.FILLED, TOAST_SEVERITY.ERROR, fail.message);
      reset();
    },
  });

  function submitHandler(data: FormData) {
    mutate(data);
  }

  return (
    <section className={styles.container}>
      <div className={styles.loginContainer}>
        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(submitHandler)}>
            <Logo />
            <div className={styles.inputsContainer}>
              <h2 className={styles.title}>Welcome to our expenses app</h2>
              <InputField
                label="email"
                type="email"
                variant={INPUT_FIELD_VARIANTS.OUTLINED}
                dataName="email"
                required
              />
              <Button variant="contained" type="submit">
                <Stack sx={{ color: "white" }}>
                  {isPending ? (
                    <CircularProgress size="30px" color="inherit" />
                  ) : (
                    "Send email"
                  )}
                </Stack>
              </Button>
              <Typography className={styles.link}>
                <Link to={ROUTES.LOGIN}>Already have an account?</Link>
              </Typography>
            </div>
          </form>
        </FormProvider>
      </div>
      <BackgroundLogo />
    </section>
  );
}
