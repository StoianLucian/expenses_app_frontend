import { useMutation } from "@tanstack/react-query";
import BackgroundLogo from "../../components/backgroundLogo/BackgroundLogo";
import Logo from "../../components/logo/Logo";
import styles from "./Register.module.scss";
import { FormProvider, useForm } from "react-hook-form";
import { RegisterData } from "../../types/register";
import { register } from "../../api/auth/users";
import { Link, useNavigate } from "react-router-dom";
import Error from "../../components/error/Error";
import { Button } from "@mui/material";
import InputField from "../../components/Inputs/InputField";
import { UseToastcontext } from "../../context/toastContext.tsx/ToastContext";

export default function Register() {
  const navigate = useNavigate();
  const { toastHandler } = UseToastcontext();
  const loginMethods = useForm<RegisterData>();

  const { handleSubmit, reset } = loginMethods;

  const { mutate, error } = useMutation({
    mutationFn: (data: RegisterData) => register(data),
    onSuccess: (success) => {
      toastHandler(
        "filled",
        "success",
        "Sucessfully registered, and email was sent to activate your account"
      );
      navigate("/login");
    },
    onError: async (fail) => {
      console.log(fail);
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
                variant="outlined"
                required={true}
              />
              <InputField
                dataName="password"
                label="password"
                type="password"
                variant="outlined"
                required={true}
              />
              <InputField
                dataName="confirmPassword"
                label="confirm password"
                type="password"
                variant="outlined"
                required={true}
                watchedInput="password"
              />
              <Button variant="contained" type="submit">
                Sign up
              </Button>
              <div className={styles.link}>
                <Link to={"/login"}>Already have an account?</Link>
              </div>
              <Error errorMessage={error?.message} />
            </div>
          </form>
        </FormProvider>
      </div>
      <BackgroundLogo />
    </section>
  );
}