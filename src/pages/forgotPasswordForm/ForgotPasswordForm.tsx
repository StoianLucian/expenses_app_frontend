import { Link, useParams } from "react-router-dom";
import BackgroundLogo from "../../components/backgroundLogo/BackgroundLogo";
import Logo from "../../components/logo/Logo";
import styles from "./ForgotPassword.module.scss";

import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { resetForgotPassword } from "../../api/auth/users";
import InputField, {
  INPUT_FIELD_VARIANTS,
} from "../../components/Inputs/InputField";
import { Button, Typography } from "@mui/material";
import {
  TOAST_SEVERITY,
  TOAST_VARIANT,
  UseToastContext,
} from "../../context/toastContext.tsx/ToastContext";

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
  token: string;
};

export default function ForgotPasswordForm() {
  const { token } = useParams();
  const { toastHandler } = UseToastContext();

  const formMethods = useForm<FormData>();

  const { handleSubmit } = formMethods;

  const { mutate } = useMutation({
    mutationFn: (data: any) => resetForgotPassword(data, token),
    onSuccess: (success) => {
      toastHandler(TOAST_VARIANT.FILLED, TOAST_SEVERITY.SUCCESS, success.data);
    },
    onError: async (fail) => {
      console.log(fail);
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
              <InputField
                label="password"
                type="password"
                variant={INPUT_FIELD_VARIANTS.OUTLINED}
                dataName="password"
                required
              />
              <InputField
                label="confirm password"
                type="password"
                variant={INPUT_FIELD_VARIANTS.OUTLINED}
                dataName="confirmPassword"
                watchedInput="password"
                required
              />
              <Button variant="contained" type="submit">
                submit
              </Button>
              <Typography className={styles.link}>
                <Link to={"/login"}>Already have an account?</Link>
              </Typography>
            </div>
          </form>
        </FormProvider>
      </div>
      <BackgroundLogo />
    </section>
  );
}
