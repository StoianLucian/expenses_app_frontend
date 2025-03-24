import ForgotPassword from "../pages/forgotPassword/ForgotPassword";
import ResetPassword from "../pages/resetPassword/ResetPassword";
import HomePage from "../pages/home/Home";
import LoginPage from "../pages/login/LoginPage";
import NotFound from "../pages/notFound/NotFound";
import RegisterPage from "../pages/register/RegisterPage";
import ActivateUser from "../pages/activateUser/ActivateUser";

type PathsType = {
  path: string;
  component: JSX.Element;
};

export enum ROUTES {
  HOME = "/",
  LOGIN = "/login",
  REGISTER = "/register",
  USER_ACTIVATE = "/user/activate",
  FORGOT_PASSWORD = "/forgot-password",
  NOT_FOUND = "*",
}

export const unprotectedPaths: PathsType[] = [
  {
    path: ROUTES.LOGIN,
    component: <LoginPage />,
  },
  {
    path: ROUTES.REGISTER,
    component: <RegisterPage />,
  },
  {
    path: `${ROUTES.USER_ACTIVATE}/:token`,
    component: <ActivateUser />
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    component: <ForgotPassword />,
  },
  {
    path: `${ROUTES.FORGOT_PASSWORD}/:token`,
    component: <ResetPassword />,
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
