import { useMutation } from "@tanstack/react-query";

import { FormProvider, useForm } from "react-hook-form";
import { login } from "../../api/auth/auth";
import { UseAuthContext } from "../../context/authContext/AuthContext";
import { AuthBadRequest, AuthData, AuthErrors, LoginData } from "../../types/auth";
import InputField, {
  INPUT_FIELD_VARIANTS,
} from "../../components/inputs/InputField";
import { InputTypeEnum } from "../../components/inputs/inputFieldUtils";
import { TEST_ID } from "../../components/inputs/__tests__/testIds";
import { LABEL, TEXT } from "../../utils/strings";
import { dataName } from "../register/types/types";
import AuthForm from "../../components/authForm/AuthForm";
import { useState } from "react";
import { UseToastContext } from "../../context/toastContext/ToastContext";
import { ToastSeverity } from "../../components/toast/Toast";
import { NavLink, useNavigate } from "react-router-dom";
import { ROUTES } from "../../Routes/routes";
import { FormHelperText } from "@mui/material";


export default function LoginPage() {
  const [error, setError] = useState<AuthErrors>({});
  const { setIsLoggedIn } = UseAuthContext();
  const navigate = useNavigate();

  const { toastHandler } = UseToastContext();

  const loginMethods = useForm<LoginData>();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: LoginData) => login(data),
    onSuccess: (success) => {
      setIsLoggedIn(success);
      toastHandler({
        message: success.message,
        severity: ToastSeverity.SUCCESS,
      });
      navigate(ROUTES.HOME);
    },
    onError: async (fail: AuthBadRequest) => {
      toastHandler({
        message: fail.statusCode,
        severity: ToastSeverity.ERROR,
      });

      fail.errors.forEach((error) => {
        setError((prevState: AuthErrors) => ({ ...prevState, ...error }));
      });
    },
  });

  function submitHandler(data: AuthData) {
    mutate(data as LoginData);
  }

  return (
    <FormProvider {...loginMethods}>
      <AuthForm
        isPending={isPending}
        submitBtnText={TEXT.LOGIN}
        submitHandler={submitHandler}
      >
        <InputField
          dataName={dataName.EMAIL}
          label={LABEL.EMAIL_FIELD}
          type={InputTypeEnum.EMAIL}
          variant={INPUT_FIELD_VARIANTS.OUTLINED}
          required
          dataTestId={TEST_ID.EMAIL_FIELD}
          error={error.email}
        />
        <InputField
          dataName={dataName.PASSWORD}
          label={LABEL.PASSWORD_FIELD}
          type={InputTypeEnum.PASSWORD}
          variant={INPUT_FIELD_VARIANTS.OUTLINED}
          required
          minPasswordLength={10}
          dataTestId={TEST_ID.PASSWORD_FIELD}
          error={error.password}
        />
        <NavLink to={ROUTES.REGISTER}>
          <FormHelperText>Not registered? Click here!</FormHelperText>
        </NavLink>
      </AuthForm>
    </FormProvider>
  );
}
