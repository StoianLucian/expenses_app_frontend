export const TEXT = {
  SIGNUP: "Sign up",
  LOGIN: "Login",
  SEND_EMAIL: "Send email",
  RESET: "Reset",
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
