import { useMutation } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { register } from "../../api/auth/users";
import { useNavigate } from "react-router-dom";
import { LABEL, TEST_ID, TEXT } from "../../utils/strings";
import { ROUTES } from "../../Routes/routes";
import InputField, {
  INPUT_FIELD_VARIANTS,
} from "../../components/inputs/InputField";
import AuthForm from "../../components/test/AuthForm";
import { RegisterData } from "../../types/auth";

export default function Register() {
  const navigate = useNavigate();
  const registerMethods = useForm<RegisterData>();

  const { reset } = registerMethods;

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
    <FormProvider {...registerMethods}>
      <AuthForm
        submitBtnText={TEXT.SIGNUP}
        submitHandler={submitHandler}
        isPending={isPending}
      >
        <InputField
          dataName="email"
          label={LABEL.EMAIL_FIELD}
          type="email"
          variant={INPUT_FIELD_VARIANTS.OUTLINED}
          required
          dataTestId={TEST_ID.EMAIL_FIELD}
          inputSize="small"
        />
        <InputField
          dataName="password"
          label={LABEL.PASSWORD_FIELD}
          type="password"
          variant={INPUT_FIELD_VARIANTS.OUTLINED}
          required
          minPasswordLength={10}
          dataTestId={TEST_ID.PASSWORD_FIELD}
          inputSize="small"
        />
        <InputField
          dataName="confirmPassword"
          label={LABEL.CONFIRM_PASSWORD_FIELD}
          type="password"
          variant={INPUT_FIELD_VARIANTS.OUTLINED}
          required
          watchedInput="password"
          dataTestId={TEST_ID.CONFIRM_PASSWORD_FIELD}
          inputSize="small"
        />
      </AuthForm>
    </FormProvider>
  );
}
