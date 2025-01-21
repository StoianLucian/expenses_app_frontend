import { useMutation } from "@tanstack/react-query";
import BackgroundLogo from "../../components/backgroundLogo/BackgroundLogo";
import Logo from "../../components/logo/Logo";
import styles from "./Register.module.scss";
import { FormProvider, useForm } from "react-hook-form";
import { RegisterData } from "../../types/register";
import { register } from "../../api/auth/users";
import { Link, useNavigate } from "react-router-dom";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { LABEL, TEXT } from "../../utils/strings";
import { ROUTES } from "../../Routes/routes";
import InputField, {
  INPUT_FIELD_VARIANTS,
} from "../../components/inputs/InputField";
import { InputTypeEnum } from "../../components/inputs/inputFieldUtils";

export default function Register() {
  const navigate = useNavigate();
  const registerMethods = useForm<RegisterData>();

  const { handleSubmit, reset } = registerMethods;

  const { mutate, isPending } = useMutation({
    mutationFn: (data: RegisterData) => register(data),
    onSuccess: (_success) => {
      navigate(ROUTES.LOGIN);
    },
    onError: async (_fail) => {
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
        <FormProvider {...registerMethods}>
          <form onSubmit={handleSubmit(submitHandler)}>
            <Logo />
            <div className={styles.inputsContainer}>
              <h2 className={styles.title}>
                Welcome to our expenses app <br />
                Sign up to your account
              </h2>
              <InputField
                dataName="email"
                label={LABEL.EMAIL_FIELD}
                type={InputTypeEnum.EMAIL}
                variant={INPUT_FIELD_VARIANTS.OUTLINED}
                required
                isEmail
              />
              <InputField
                dataName="password"
                label={LABEL.PASSWORD_FIELD}
                type={InputTypeEnum.PASSWORD}
                variant={INPUT_FIELD_VARIANTS.OUTLINED}
                required
                minPasswordLength={10}
              />
              <InputField
                dataName="confirmPassword"
                label={LABEL.CONFIRM_PASSWORD_FIELD}
                type={InputTypeEnum.PASSWORD}
                variant={INPUT_FIELD_VARIANTS.OUTLINED}
                required
                watchedInput="password"
              />
              <Button variant="contained" type="submit" data-testid="submitBtn">
                <Stack sx={{ color: "white" }}>
                  {isPending ? (
                    <CircularProgress size="30px" color="inherit" />
                  ) : (
                    TEXT.SIGNUP
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
