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
};
