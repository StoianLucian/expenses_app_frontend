export type LoginData = {
  email: string;
  password: string;
};

export type ForgotPasswordData = {
  email: string;
};

export type RegisterData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type AuthData = RegisterData | LoginData | ForgotPasswordData;
