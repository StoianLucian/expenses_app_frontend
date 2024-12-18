import { useMutation } from "@tanstack/react-query";
import BackgroundLogo from "../../components/backgroundLogo/BackgroundLogo";
import Logo from "../../components/logo/Logo";
import styles from "./Login.module.scss";

import { FormProvider, useForm } from "react-hook-form";
import { login } from "../../api/auth/auth";
import { UseAuthContext } from "../../context/authContext/AuthContext";
import { LoginData } from "../../types/auth";
import { Link } from "react-router-dom";
import InputField, {
  INPUT_FIELD_VARIANTS,
} from "../../components/Inputs/InputField";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  ListItem,
  MenuItem,
  Select,
} from "@mui/material";
import {
  TOAST_SEVERITY,
  UseToastContext,
  TOAST_VARIANT,
} from "../../context/toastContext.tsx/ToastContext";

export default function Login() {
  const { setIsLoggedIn } = UseAuthContext();
  const { toastHandler } = UseToastContext();

  const loginMethods = useForm<LoginData>();

  const { handleSubmit, reset } = loginMethods;

  const { mutate } = useMutation({
    mutationFn: (data: LoginData) => login(data),
    onSuccess: (success) => {
      console.log(success);
      toastHandler(
        TOAST_VARIANT.FILLED,
        TOAST_SEVERITY.SUCCESS,
        success.message
      );
      setIsLoggedIn(success.user);
    },
    onError: async (fail) => {
      reset();
      toastHandler(TOAST_VARIANT.FILLED, TOAST_SEVERITY.ERROR, fail.message);
    },
  });

  function submitHandler(data: LoginData) {
    mutate(data);
  }

  return (
    <Box sx={{ display: "flex" }}>
      <div className={styles.loginContainer}>
        <FormProvider {...loginMethods}>
          <form onSubmit={handleSubmit(submitHandler)}>
            <Logo />
            <div className={styles.inputsContainer}>
              <h2 className={styles.title}>
                Welcome to our expenses app <br />
                Sign in to your account
              </h2>
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
              <Button variant="contained" type="submit">
                Login
              </Button>
              <div className={styles.link}>
                <Link to={"/register"}>No account? Sign up here</Link>
              </div>
              <div className={styles.link}>
                <Link to={"/forgot-password"}>
                  Forgot password? Click here to reset
                </Link>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
      <BackgroundLogo />
    </Box>
  );
}
