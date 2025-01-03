import { useMutation } from "@tanstack/react-query";
import BackgroundLogo from "../../components/backgroundLogo/BackgroundLogo";
import Logo from "../../components/logo/Logo";
import styles from "./Register.module.scss";

import { FormProvider, useForm } from "react-hook-form";
import { RegisterData } from "../../types/register";
import { register } from "../../api/auth/users";
import { Link } from "react-router-dom";
import Error from "../../components/error/Error";

export default function Register() {
  const loginMethods = useForm<RegisterData>();

  const {
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = loginMethods;

  const { mutate, error } = useMutation({
    mutationFn: (data: RegisterData) => register(data),
    onSuccess: (success) => {
      console.log(success);
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
              <input
                {...loginMethods.register("email", {
                  required: { value: true, message: "email field is required" },
                })}
                className={styles.input}
                placeholder="email address"
                type="email"
              />
              <Error errorMessage={errors.email?.message} />
              <input
                {...loginMethods.register("password", {
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
                {...loginMethods.register("confirmPassword", {
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
              <button className={styles.button}>Sign up</button>
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
