import ForgotPassword from "../pages/forgotPassword/ForgotPassword";
import ForgotPasswordForm from "../pages/forgotPasswordForm/forgotPasswordForm";
import HomePage from "../pages/home/Home";
import Login from "../pages/login/Login";
import NotFound from "../pages/notFound/NotFound";
import Register from "../pages/register/Register";

type PathsType = {
  path: string;
  component: JSX.Element;
};

export const unprotectedPaths: PathsType[] = [
  {
    path: "/login",
    component: <Login />,
  },
  {
    path: "/register",
    component: <Register />,
  },
  {
    path: "/forgot-password",
    component: <ForgotPassword />,
  },
  {
    path: "/forgot-password/:token",
    component: <ForgotPasswordForm />,
  },
  {
    path: "*",
    component: <NotFound />,
  },
];

export const protectedPaths: PathsType[] = [
  {
    path: "/",
    component: <HomePage />,
  },
];
