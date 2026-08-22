import { createContext, useContext, useEffect, useState } from "react";
import { Redirect, useLocation } from "wouter";
import type { AuthContextType, IUser } from "@/lib/types";
import { useGetProfileMutation } from "../apis/user-apis";
import { useLogoutAccountMutation } from "../apis/auth-apis";

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  currentUser: null,
  updateIsAuthenticatedState: () => {},
  signout: () => {},
});

export function AuthContextProvider({ children }: React.PropsWithChildren) {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const [getCurrentUser, { data, isSuccess, isError }] =
    useGetProfileMutation();

  const [logoutAccount] = useLogoutAccountMutation();

  const [, navigate] = useLocation();

  useEffect(() => {
    if (localStorage.getItem("isAuth")) {
      getCurrentUser(null);
    }
  }, []);

  useEffect(() => {
    if (isSuccess && data) {
      updateIsAuthenticatedState(data?.data);
    }

    if (isError) {
      signout();
    }
  }, [isSuccess, isError]);

  function updateIsAuthenticatedState(user: IUser): void {
    if (localStorage.getItem("isAuth")) {
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
  }

  function signout() {
    logoutAccount(null);
    localStorage.removeItem("isAuth");
    setIsAuthenticated(false);
    setCurrentUser(null);
    navigate("/");
  }

  const value = {
    currentUser,
    isAuthenticated,
    updateIsAuthenticatedState,
    signout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}

export function RequireAuth({ children }: { children: React.ReactNode }) {
  if (!localStorage.getItem("isAuth")) {
    return <Redirect to="/auth/sign-in" />;
  }

  return <>{children}</>;
}
