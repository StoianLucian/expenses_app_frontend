import { FieldValues, UseFormWatch } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InputAdornment, IconButton } from "@mui/material";
import { TEST_ID } from "./__tests__/testIds";

type GetValidationRulesProps = {
  label: string;
  required?: boolean;
  minPasswordLength?: number;
  watchedInput?: string;
  watch: UseFormWatch<FieldValues>;
  type: string;
};

export const ERRORS = {
  REQUIRED: (label: string) => `${label} is required`,
  PSW_NO_MATCH: "Passwords do not match",
  FIELD_EMPTY: (label: string) =>
    `${label} field cannot be empty or contain only spaces`,
  MIN_LENGTH: (number: number) =>
    `Password must be at least ${number} characters long`,
  SPECIAL_CHARACTER: "Password must contain at least one special character",
  LOWERCASE: "Password must contain at least one lower case character",
  UPPERCASE: "Password must contain at least one upper case character",
  NUMBER: "Password must contain at least one number",
};

export const isPasswordType = (type: string) => {
  return type === "password";
};

export const renderVisibilityComponent = (
  visibility: boolean,
  visibilityHandler: VoidFunction
) => {
  return (
    <InputAdornment position="end">
      <IconButton
        onClick={visibilityHandler}
        data-testid={TEST_ID.VISIBILITY_BUTTON}
      >
        {visibility ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );
};

export const getValidationRules = ({
  label,
  required,
  minPasswordLength,
  watchedInput,
  watch,
  type,
}: GetValidationRulesProps) => {
  return {
    required: {
      value: !!required,
      message: ERRORS.REQUIRED(label),
    },
    ...(minPasswordLength &&
      minPasswordLength > 0 && {
        minLength: {
          value: minPasswordLength,
          message: ERRORS.MIN_LENGTH(minPasswordLength),
        },
      }),
    validate: (value: string) => {
      const specialCharRegex = /[!#@$%^&*(),.?":{}|<>]/;
      const lowerCaseRegex = /[a-z]/;
      const upperCaseRegex = /[A-Z]/;
      const numbersRegex = /[0-9]/;

      if (type === "password") {
        const validations = [
          { regex: specialCharRegex, error: ERRORS.SPECIAL_CHARACTER },
          { regex: lowerCaseRegex, error: ERRORS.LOWERCASE },
          { regex: upperCaseRegex, error: ERRORS.UPPERCASE },
          { regex: numbersRegex, error: ERRORS.NUMBER },
        ];

        for (const { regex, error } of validations) {
          if (!regex.test(value)) {
            return error;
          }
        }
      }

      if (value.length === 0 && required) {
        return ERRORS.FIELD_EMPTY(label);
      }

      if (watchedInput) {
        return value === watch(watchedInput) || ERRORS.PSW_NO_MATCH;
      }
    },
  };
};
