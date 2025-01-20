export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  email: string;
  password: string;
  confirmPassword?: string;
  roleId?: number;
};

export type ForgotPasswordData = {
  email: string;
};
