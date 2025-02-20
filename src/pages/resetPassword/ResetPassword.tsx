import { useParams } from "react-router-dom";

import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { resetForgotPassword } from "../../api/auth/users";
import AuthForm from "../../components/authForm/AuthForm";
import InputField, {
  INPUT_FIELD_VARIANTS,
} from "../../components/inputs/InputField";
import { InputTypeEnum } from "../../components/inputs/inputFieldUtils";
import { TEXT, LABEL } from "../../utils/strings";
import { dataName } from "../register/types/types";
import { TEST_ID } from "../../components/inputs/__tests__/testIds";
import { AuthData, ResetForgotPasswordData } from "../../types/auth";

export default function ResetPassword() {
  const ForgotPasswordFormMethods = useForm<ResetForgotPasswordData>();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ResetForgotPasswordData) => resetForgotPassword(data),
    onSuccess: (success) => {
      console.log(success);
    },
    onError: async (fail) => {
      console.log(fail);
    },
  });

  function submitHandler(data: AuthData) {
    mutate(data as ResetForgotPasswordData);
  }

  return (
    <FormProvider {...ForgotPasswordFormMethods}>
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
          // error={error.email} todo: add validation on backend
        />
        <InputField
          dataName={dataName.PASSWORD}
          label={LABEL.PASSWORD_FIELD}
          type={InputTypeEnum.PASSWORD}
          variant={INPUT_FIELD_VARIANTS.OUTLINED}
          required
          // error={error.password} todo: add validation on backend
          minPasswordLength={10}
          dataTestId={TEST_ID.PASSWORD_FIELD}
        />
        <InputField
          dataName={dataName.CONFIRM_PASSWORD}
          label={LABEL.CONFIRM_PASSWORD_FIELD}
          type={InputTypeEnum.PASSWORD}
          variant={INPUT_FIELD_VARIANTS.OUTLINED}
          required
          // error={error.confirmPassword} todo: add validation on backend
          watchedInput={dataName.PASSWORD}
          dataTestId={TEST_ID.CONFIRM_PASSWORD_FIELD}
        />
      </AuthForm>
    </FormProvider>
  );
}
