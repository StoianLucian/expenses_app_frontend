import { Navigate } from "react-router-dom";
import { UserType } from "../types/shared/user";

export default function ProtectedRoute({
  component,
  isLoggedIn,
}: {
  component: JSX.Element;
  isLoggedIn: UserType | undefined;
}) {
  return isLoggedIn ? component : <Navigate to="/login" />;
}
