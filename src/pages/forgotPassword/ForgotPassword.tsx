import { Link } from "react-router-dom";
import BackgroundLogo from "../../components/backgroundLogo/BackgroundLogo";
import Logo from "../../components/logo/Logo";
import styles from "./ForgotPassword.module.scss";

import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { sendForgotPasswordEmail } from "../../api/auth/users";
import Error from "../../components/error/Error";

type FormData = {
  email: string;
};

export default function ForgotPassword() {
  const formMethods = useForm<FormData>();

  const {
    formState: { errors },
    handleSubmit,
  } = formMethods;

  const { mutate, error } = useMutation({
    mutationFn: (data: any) => sendForgotPasswordEmail(data),
    onSuccess: (success) => {
      console.log(success);
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
              <input
                {...formMethods.register("email", {
                  required: { value: true, message: "email field is required" },
                })}
                className={styles.input}
                placeholder="email address"
                type="email"
              />
              <Error errorMessage={errors.email?.message} />
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
