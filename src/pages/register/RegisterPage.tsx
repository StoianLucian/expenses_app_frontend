import { useMutation } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { register } from "../../api/auth/users";
import { useNavigate } from "react-router-dom";
import { LABEL, TEXT } from "../../utils/strings";
import { ROUTES } from "../../Routes/routes";
import InputField, {
  INPUT_FIELD_VARIANTS,
} from "../../components/inputs/InputField";
import AuthForm from "../../components/authForm/AuthForm";
import { RegisterData } from "../../types/auth";
import { InputTypeEnum } from "../../components/inputs/inputFieldUtils";
import { TEST_ID } from "../../components/inputs/__tests__/testIds";
import { dataName } from "./types/types";
import { UseToastContext } from "../../context/toastContext/ToastContext";
import { ToastSeverity } from "../../components/toast/Toast";
import { useState } from "react";

type Errors = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

type RegisterBadRequest = {
  error: string;
  errors: Errors[];
  statusCode: string;
  message?: string;
};

export default function RegisterPage() {
  const [error, setError] = useState<Errors>({});
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
    onError: async (_fail: RegisterBadRequest) => {
      toastHandler({
        message: _fail.statusCode,
        severity: ToastSeverity.ERROR,
      });

      _fail.errors.forEach((error) => {
        setError((prevState: Errors) => ({
          ...prevState,
          ...error,
        }));
      });
    },
  });

  function submitHandler(data: RegisterData) {
    setError({});
    mutate(data);
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
      </AuthForm>
    </FormProvider>
  );
}
