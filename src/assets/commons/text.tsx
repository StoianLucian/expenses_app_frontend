export const TEXT = {
  SIGNUP: "Sign up",
  LOGIN: "Login",
  SEND_EMAIL: "Send email",
  RESET: "Reset",
};

export const ERRORS = {
  REQUIRED: (label: string | undefined) => `${label} is required`,
  PSW_NO_MATCH: "Passwords do not match",
  FIELD_EMPTY: (label: string | undefined) =>
    `${label} field cannot be empty or contain only spaces`,
};

export const COMMONS = {
  ADD_EXPENSE: "Add expenses",
  CHARTS: "Charts",
  SETTINGS: "Settings",
  TITLE: "Exchange App",
};
