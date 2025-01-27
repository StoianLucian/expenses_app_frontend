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
  confirmPassword?: string;
  // roleId?: number; is set by default to 1 will think of a admin dashboard in the future
};
