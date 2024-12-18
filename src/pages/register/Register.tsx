import { useMutation } from "@tanstack/react-query";
import BackgroundLogo from "../../components/backgroundLogo/BackgroundLogo";
import Logo from "../../components/logo/Logo";
import styles from "./Register.module.scss";
import { FormProvider, useForm } from "react-hook-form";
import { RegisterData } from "../../types/register";
import { register } from "../../api/auth/users";
import { Link, useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import InputField, {
  INPUT_FIELD_VARIANTS,
} from "../../components/Inputs/InputField";
import {
  TOAST_SEVERITY,
  UseToastContext,
  TOAST_VARIANT,
} from "../../context/toastContext.tsx/ToastContext";

export default function Register() {
  const navigate = useNavigate();
  const { toastHandler } = UseToastContext();
  const loginMethods = useForm<RegisterData>();

  const { handleSubmit, reset } = loginMethods;

  const { mutate } = useMutation({
    mutationFn: (data: RegisterData) => register(data),
    onSuccess: (success) => {
      toastHandler(
        TOAST_VARIANT.FILLED,
        TOAST_SEVERITY.SUCCESS,
        success.data.message
      );
      navigate("/login");
    },
    onError: async (fail) => {
      toastHandler(TOAST_VARIANT.FILLED, TOAST_SEVERITY.ERROR, fail.message);
      reset();
    },
  });

  function submitHandler(data: RegisterData) {
    data.roleId = 1;
    mutate(data);
  }

  return (
    <section className={styles.container}>
      <div className={styles.loginContainer}>
        <FormProvider {...loginMethods}>
          <form onSubmit={handleSubmit(submitHandler)}>
            <Logo />
            <div className={styles.inputsContainer}>
              <h2 className={styles.title}>
                Welcome to our expenses app <br />
                Sign up to your account
              </h2>
              <InputField
                dataName="email"
                label="email"
                type="text"
                variant={INPUT_FIELD_VARIANTS.OUTLINED}
                required
              />
              <InputField
                dataName="password"
                label="password"
                type="password"
                variant={INPUT_FIELD_VARIANTS.OUTLINED}
                required
              />
              <InputField
                dataName="confirmPassword"
                label="confirm password"
                type="password"
                variant={INPUT_FIELD_VARIANTS.OUTLINED}
                required
                watchedInput="password"
              />
              <Button variant="contained" type="submit">
                Sign up
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
