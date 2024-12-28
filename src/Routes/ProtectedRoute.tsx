import { Navigate } from "react-router-dom";
import { UserType } from "../types/shared/user";
import { ROUTES } from "./routes";

export default function ProtectedRoute({
  component,
  isLoggedIn,
}: {
  component: JSX.Element;
  isLoggedIn: UserType | undefined;
}) {
  return isLoggedIn ? component : <Navigate to={ROUTES.LOGIN} />;
}
