import { FieldValues, UseFormWatch } from "react-hook-form";

type GetValidationRulesProps = {
  label: string;
  required?: boolean;
  minPasswordLength?: number;
  watchedInput?: string;
  watch: UseFormWatch<FieldValues>;
  type: InputTypeEnum;
};

export enum InputTypeEnum {
  PASSWORD = "password",
  TEXT = "text",
  EMAIL = "email",
}

export enum KeyboardCode {
  ARROW_UP = "ArrowUp",
  ARROW_DOWN = "ArrowDown",
}

export enum Direction {
  NEXT = "next",
  PREV = "prev",
}

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
  INVALID_EMAIL: "Invalid email format",
};

export const isPasswordType = (type: InputTypeEnum) => {
  return type === InputTypeEnum.PASSWORD;
};

export const isEmailType = (type: InputTypeEnum) => {
  return type === InputTypeEnum.EMAIL;
};

export const handleFocus = (e: React.KeyboardEvent, direction: Direction) => {
  e.preventDefault();
  const form = e.currentTarget.closest("form") as HTMLFormElement;

  if (!form) return;

  const formElements = Array.from(form.elements) as HTMLElement[];
  const focusableElement = e.target as HTMLInputElement;

  const focusableElements = formElements.filter((element) => {
    return element.tagName === "INPUT";
  });

  const currentIndex = focusableElements.indexOf(focusableElement);

  const newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;

  const nextElement = focusableElements[newIndex];

  if (nextElement) {
    nextElement.focus();
  }
};

export const focusPrev = (e: React.KeyboardEvent) => {
  e.preventDefault();
  const form = e.currentTarget.closest("form") as HTMLFormElement;

  if (!form) return;

  const formElements = Array.from(form.elements) as HTMLElement[];
  const focusableElement = e.target as HTMLInputElement;

  const focusableElements = formElements.filter((element) => {
    return element.tagName === "INPUT";
  });

  const currentIndex = focusableElements.indexOf(focusableElement);

  const prevElement = focusableElements[currentIndex - 1];

  if (prevElement) {
    prevElement.focus();
  } else {
    focusableElements[focusableElements.length - 1].focus();
  }
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
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (isPasswordType(type)) {
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

      if (isEmailType(type) && !emailRegex.test(value)) {
        return ERRORS.INVALID_EMAIL;
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
