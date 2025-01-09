import { createContext, useCallback, useEffect, useState } from "react";
import { localStorageKeys } from "../config/localStorageKeys";
import { useQuery } from "@tanstack/react-query";
import { userServices } from "../services/userServices";
import toast from "react-hot-toast";
import { Splash } from "../../view/components/Splash";

interface AuthContextValue {
  signedIn: boolean;
  signIn: (accessToken: string) => void;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(
      localStorageKeys.ACCESS_TOKEN,
    );

    return !!storedAccessToken;
  });

  const { isError, isFetching, isSuccess, remove } = useQuery({
    queryKey: ["users", "me"],
    queryFn: () => userServices.me(),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: signedIn,
    staleTime: Infinity,
  });

  const signIn = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);
    setSignedIn(true);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    remove();
    setSignedIn(false);
  }, [remove]);

  useEffect(() => {
    if (isError) {
      toast.error("Sua sessão expirou");
      signOut();
    }
  }, [signOut, isError]);
  return (
    <AuthContext.Provider
      value={{ signedIn: isSuccess && signedIn, signIn, signOut }}
    >
      <Splash isLoading={isFetching} />

      {!isFetching && children}
    </AuthContext.Provider>
  );
}
