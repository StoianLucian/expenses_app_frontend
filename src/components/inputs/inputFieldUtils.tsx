import { FieldValues, UseFormWatch } from "react-hook-form";
import { ERRORS } from "../../utils/strings";

type GetValidationRulesProps = {
  label: string;
  required?: boolean;
  minPasswordLength?: number;
  watchedInput?: string;
  watch: UseFormWatch<FieldValues>;
  type: string;
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
    validate: (value: string) => {;

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
