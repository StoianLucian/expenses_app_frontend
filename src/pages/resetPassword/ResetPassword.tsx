import { FormProvider, useForm } from "react-hook-form";
import AuthForm from "../../components/authForm/AuthForm";
import InputField, {
  INPUT_FIELD_VARIANTS,
} from "../../components/inputs/InputField";
import { InputTypeEnum } from "../../components/inputs/inputFieldUtils";
import { TEXT, LABEL } from "../../utils/strings";
import { dataName } from "../register/types/types";
import { TEST_ID } from "../../components/inputs/__tests__/testIds";
import { AuthBadRequest, AuthData, AuthErrors, AuthSuccessRequest, ResetForgotPasswordData } from "../../types/auth";
import { useNavigate, useParams } from "react-router-dom";
import { UseToastContext } from "../../context/toastContext/ToastContext";
import { ToastSeverity } from "../../components/toast/Toast";
import { useState } from "react";
import { UseResetPassword } from "../../hooks/UseResetPassword";
import { ROUTES } from "../../Routes/routes";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [errors, setError] = useState<AuthErrors>({})
  const ForgotPasswordFormMethods = useForm<ResetForgotPasswordData>();

  const { token } = useParams();
  const { toastHandler } = UseToastContext();

  const { resetPassword, isPending } = UseResetPassword(token!, onSuccess, onError)


  function onSuccess(response: AuthSuccessRequest) {
    toastHandler({
      message: response.message,
      severity: ToastSeverity.SUCCESS
    })
    navigate(ROUTES.LOGIN);
  }

  function onError(response: AuthBadRequest) {
    toastHandler({
      message: response.message,
      severity: ToastSeverity.ERROR
    })

    response.errors.forEach((error) => {
      setError((prevState: AuthErrors) => ({ ...prevState, ...error }));
    });
  }

  function submitHandler(data: AuthData) {
    resetPassword(data as ResetForgotPasswordData)
  }

  return (
    <FormProvider {...ForgotPasswordFormMethods}>
      <AuthForm
        isPending={isPending}
        submitBtnText={TEXT.RESET_PASSWORD}
        submitHandler={submitHandler}
      >
        <InputField
          dataName={dataName.EMAIL}
          label={LABEL.EMAIL_FIELD}
          type={InputTypeEnum.EMAIL}
          variant={INPUT_FIELD_VARIANTS.OUTLINED}
          required
          dataTestId={TEST_ID.EMAIL_FIELD}
          error={errors.email}
        />
        <InputField
          dataName={dataName.PASSWORD}
          label={LABEL.PASSWORD_FIELD}
          type={InputTypeEnum.PASSWORD}
          variant={INPUT_FIELD_VARIANTS.OUTLINED}
          required
          minPasswordLength={10}
          dataTestId={TEST_ID.PASSWORD_FIELD}
          error={errors.password}
        />
        <InputField
          dataName={dataName.CONFIRM_PASSWORD}
          label={LABEL.CONFIRM_PASSWORD_FIELD}
          type={InputTypeEnum.PASSWORD}
          variant={INPUT_FIELD_VARIANTS.OUTLINED}
          required
          watchedInput={dataName.PASSWORD}
          dataTestId={TEST_ID.CONFIRM_PASSWORD_FIELD}
          error={errors.confirmPassword}
        />
      </AuthForm>
    </FormProvider>
  );
}
