import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { sendForgotPasswordEmail } from "../../api/auth/users";
import AuthForm from "../../components/authForm/AuthForm";
import InputField, {
  INPUT_FIELD_VARIANTS,
} from "../../components/inputs/InputField";
import { InputTypeEnum } from "../../components/inputs/inputFieldUtils";
import { LABEL, TEXT } from "../../utils/strings";
import { dataName } from "../register/types/types";
import { TEST_ID } from "../../components/inputs/__tests__/testIds";
import { AuthData, ForgotPasswordData } from "../../types/auth";
import { useState } from "react";
import { UseToastContext } from "../../context/toastContext/ToastContext";
import { ToastSeverity } from "../../components/toast/Toast";

type Errors = {
  email?: string;
};

type ForgotPasswordBadRequest = {
  error: string;
  errors: Errors[];
  statusCode: string;
  message?: string;
};

export default function ForgotPassword() {
  const [error, setError] = useState<Errors>({});

  const { toastHandler } = UseToastContext();

  const forgotPasswordMethods = useForm<ForgotPasswordData>();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ForgotPasswordData) => sendForgotPasswordEmail(data),
    onSuccess: (success: any) => {
      toastHandler({
        message: success.message,
        severity: ToastSeverity.SUCCESS,
      });
    },
    onError: async (fail: ForgotPasswordBadRequest) => {
      fail.errors.forEach((error) => {
        setError((prevState: Errors) => ({ ...prevState, ...error }));
      });
    },
  });

  function submitHandler(data: AuthData) {
    mutate(data as ForgotPasswordData);
  }

  return (
    <FormProvider {...forgotPasswordMethods}>
      <AuthForm
        isPending={isPending}
        submitBtnText={TEXT.SEND_EMAIL}
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
      </AuthForm>
    </FormProvider>
  );
}
