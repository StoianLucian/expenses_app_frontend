import ForgotPassword from "../pages/forgotPassword/ForgotPassword";
import ForgotPasswordForm from "../pages/forgotPasswordForm/ForgotPasswordForm";
import HomePage from "../pages/home/Home";
import Login from "../pages/login/Login";
import NotFound from "../pages/notFound/NotFound";
import Register from "../pages/register/Register";

type PathsType = {
  path: string;
  component: JSX.Element;
};

export enum ROUTES {
  HOME = "/",
  LOGIN = "/login",
  REGISTER = "/register",
  FORGOT_PASSWORD = "/forgot-password",
  NOT_FOUND = "*",
}

export const unprotectedPaths: PathsType[] = [
  {
    path: ROUTES.LOGIN,
    component: <Login />,
  },
  {
    path: ROUTES.REGISTER,
    component: <Register />,
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    component: <ForgotPassword />,
  },
  {
    path: `${ROUTES.FORGOT_PASSWORD}/:token`,
    component: <ForgotPasswordForm />,
  },
  {
    path: ROUTES.NOT_FOUND,
    component: <NotFound />,
  },
];

export const protectedPaths: PathsType[] = [
  {
    path: ROUTES.HOME,
    component: <HomePage />,
  },
];
