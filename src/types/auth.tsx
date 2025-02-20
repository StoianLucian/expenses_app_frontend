export type RegisterData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type ForgotPasswordData = {
  email: string;
};

export type ResetForgotPasswordData = {
  email: string;
  password: string;
  confirmPassword: string;
  token: string;
};

export type AuthData =
  | RegisterData
  | LoginData
  | ForgotPasswordData
  | ResetForgotPasswordData;

export type AuthErrors = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export type AuthBadRequest = {
  error: string;
  errors: AuthErrors[];
  statusCode: string;
  message?: string;
};