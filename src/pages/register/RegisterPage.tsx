import { useMutation } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { register } from "../../api/auth/users";
import { NavLink, useNavigate } from "react-router-dom";
import { LABEL, TEXT } from "../../utils/strings";
import { ROUTES } from "../../Routes/routes";
import InputField, {
  INPUT_FIELD_VARIANTS,
} from "../../components/inputs/InputField";
import AuthForm from "../../components/authForm/AuthForm";
import { AuthBadRequest, AuthData, AuthErrors, RegisterData } from "../../types/auth";
import { InputTypeEnum } from "../../components/inputs/inputFieldUtils";
import { TEST_ID } from "../../components/inputs/__tests__/testIds";
import { dataName } from "./types/types";
import { UseToastContext } from "../../context/toastContext/ToastContext";
import { ToastSeverity } from "../../components/toast/Toast";
import { useState } from "react";
import { FormHelperText } from "@mui/material";


export default function RegisterPage() {
  const [error, setError] = useState<AuthErrors>({});
  const navigate = useNavigate();
  const registerMethods = useForm<RegisterData>();
  const { toastHandler } = UseToastContext();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: RegisterData) => await register(data),
    onSuccess: (_success) => {
      toastHandler({
        message: _success.message,
        severity: ToastSeverity.SUCCESS,
      });
      navigate(ROUTES.LOGIN);
    },
    onError: async (_fail: AuthBadRequest) => {
      toastHandler({
        message: _fail.statusCode,
        severity: ToastSeverity.ERROR,
      });

      _fail.errors.forEach((error) => {
        setError((prevState: AuthErrors) => ({
          ...prevState,
          ...error,
        }));
      });
    },
  });

  function submitHandler(data: AuthData) {
    setError({});
    mutate(data as RegisterData);
  }

  return (
    <FormProvider {...registerMethods}>
      <AuthForm
        submitBtnText={TEXT.SIGNUP}
        submitHandler={submitHandler}
        isPending={isPending}
      >
        <InputField
          dataName={dataName.EMAIL}
          label={LABEL.EMAIL_FIELD}
          type={InputTypeEnum.EMAIL}
          variant={INPUT_FIELD_VARIANTS.OUTLINED}
          required
          error={error.email}
          dataTestId={TEST_ID.EMAIL_FIELD}
        />
        <InputField
          dataName={dataName.PASSWORD}
          label={LABEL.PASSWORD_FIELD}
          type={InputTypeEnum.PASSWORD}
          variant={INPUT_FIELD_VARIANTS.OUTLINED}
          required
          error={error.password}
          minPasswordLength={10}
          dataTestId={TEST_ID.PASSWORD_FIELD}
        />
        <InputField
          dataName={dataName.CONFIRM_PASSWORD}
          label={LABEL.CONFIRM_PASSWORD_FIELD}
          type={InputTypeEnum.PASSWORD}
          variant={INPUT_FIELD_VARIANTS.OUTLINED}
          required
          error={error.confirmPassword}
          watchedInput={dataName.PASSWORD}
          dataTestId={TEST_ID.CONFIRM_PASSWORD_FIELD}
        />
        <NavLink to={ROUTES.LOGIN}>
          <FormHelperText>Already registered? Click here!</FormHelperText>
        </NavLink>
      </AuthForm>
    </FormProvider>
  );
}
