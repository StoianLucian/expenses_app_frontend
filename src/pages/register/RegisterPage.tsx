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
import { checkEmail } from "./validations/validations";

export default function RegisterPage() {
  const [error, setError] = useState({ isError: false, message: "" });
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();
  const registerMethods = useForm<RegisterData>();
  const { toastHandler } = UseToastContext();

  const submitForm = async (data: RegisterData) => {
    if (error.isError === true) {
      return; // Stop execution if there's an error
    } else {
      return await register(data);
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: RegisterData) => await submitForm(data),
    onSuccess: (_success) => {
      toastHandler({
        message: _success.message,
        severity: ToastSeverity.SUCCESS,
      });
      navigate(ROUTES.LOGIN);
    },
    onError: async (_fail) => {
      toastHandler({
        message: _fail.message,
        severity: ToastSeverity.ERROR,
      });
      setError({ isError: true, message: _fail.message });
    },
  });

  const checkUniqueUser = async (email: string) => {
    const validation = await checkEmail(email);

    if (validation.error == true) {
      setError({ isError: true, message: validation.message });
      setIsDisabled(true);
    } else {
      setError({ isError: false, message: "" });
      setIsDisabled(false);
    }
  };

  function submitHandler(data: RegisterData) {
    mutate(data);
  }

  return (
    <FormProvider {...registerMethods}>
      <AuthForm
        submitBtnText={TEXT.SIGNUP}
        submitHandler={submitHandler}
        isPending={isPending}
        isDisabled={isDisabled}
      >
        <InputField
          dataName={dataName.EMAIL}
          label={LABEL.EMAIL_FIELD}
          type={InputTypeEnum.EMAIL}
          variant={INPUT_FIELD_VARIANTS.OUTLINED}
          required
          error={error.message}
          dataTestId={TEST_ID.EMAIL_FIELD}
          onChangeHandler={checkUniqueUser}
        />
        <InputField
          dataName={dataName.PASSWORD}
          label={LABEL.PASSWORD_FIELD}
          type={InputTypeEnum.PASSWORD}
          variant={INPUT_FIELD_VARIANTS.OUTLINED}
          required
          minPasswordLength={10}
          dataTestId={TEST_ID.PASSWORD_FIELD}
        />
        <InputField
          dataName={dataName.CONFIRM_PASSWORD}
          label={LABEL.CONFIRM_PASSWORD_FIELD}
          type={InputTypeEnum.PASSWORD}
          variant={INPUT_FIELD_VARIANTS.OUTLINED}
          required
          watchedInput={dataName.PASSWORD}
          dataTestId={TEST_ID.CONFIRM_PASSWORD_FIELD}
        />
      </AuthForm>
    </FormProvider>
  );
}
