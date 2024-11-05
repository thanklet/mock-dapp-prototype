import { useAuth } from "@/app/providers/auth-provider";
import { path } from "@/utils/path";
import type { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { UserProvider } from "./user-provider";

type Props = PropsWithChildren;

export const RedirectProvider = ({ children }: Props) => {
  const { pathname } = useLocation();
  const { user, isLoading } = useAuth();
  const isAuthPath =
    path.compares(path.get().auth.login, pathname) ||
    path.compares(path.get().auth.signUp, pathname);

  if (isLoading) {
    return null;
  }

  if (!user && !isAuthPath) {
    return <Navigate to={path.get().auth.login} replace={true} />;
  }
  if (user && isAuthPath) {
    return <Navigate to={path.get().app.userId.dashboard(user.uid)} />;
  }
  if (!user) {
    return children;
  }

  return <UserProvider user={user}>{children}</UserProvider>;
};
