import { Link, useParams } from "react-router-dom";
import BackgroundLogo from "../../components/backgroundLogo/BackgroundLogo";
import Logo from "../../components/logo/Logo";
import styles from "./ForgotPassword.module.scss";

import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Error from "../../components/error/Error";
import { resetForgotPassword } from "../../api/auth/users";

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
  token: string;
};

export default function ForgotPasswordForm() {
  const { token } = useParams();

  const formMethods = useForm<FormData>();

  const {
    formState: { errors },
    handleSubmit,
    watch,
  } = formMethods;

  const { mutate, error } = useMutation({
    mutationFn: (data: any) => resetForgotPassword(data),
    onSuccess: (success) => {
      console.log(success);
    },
    onError: async (fail) => {
      console.log(fail);
    },
  });

  function submitHandler(data: FormData) {
    const newData = { ...data, token: token };

    console.log(newData);

    // mutate(data);
  }

  return (
    <section className={styles.container}>
      <div className={styles.loginContainer}>
        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(submitHandler)}>
            <Logo />
            <div className={styles.inputsContainer}>
              <h2 className={styles.title}>Welcome to our expenses app</h2>
              <input
                {...formMethods.register("email", {
                  required: { value: true, message: "email field is required" },
                })}
                className={styles.input}
                placeholder="email address"
                type="email"
              />
              <Error errorMessage={errors.email?.message} />
              <input
                {...formMethods.register("password", {
                  required: {
                    value: true,
                    message: "password field is required",
                  },
                })}
                className={styles.input}
                placeholder="password"
                type="password"
              />
              <Error errorMessage={errors.password?.message} />
              <input
                {...formMethods.register("confirmPassword", {
                  required: {
                    value: true,
                    message: "confirm password field is required",
                  },
                  validate: (value) =>
                    watch("password") === value || "passwords do not match",
                })}
                className={styles.input}
                placeholder="confirm password"
                type="password"
              />
              <Error errorMessage={errors.confirmPassword?.message} />
              <button className={styles.button}>Send email</button>
              <Error errorMessage={error?.message} />
              <div className={styles.link}>
                <Link to={"/login"}>Already have an account?</Link>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
      <BackgroundLogo />
    </section>
  );
}
