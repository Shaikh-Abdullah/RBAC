import { createContext, useEffect, useState, type ReactNode } from "react";
import * as authApi from "./api";
import type { AuthUser } from "./api";
import { TOKEN_KEY } from "../lib/api/interceptors";

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  isInitializing: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setIsInitializing(false);
      return;
    }

    authApi
      .fetchMe()
      .then((restoreUser) => setUser(restoreUser))
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
      })
      .finally(() => setIsInitializing(false));
  }, []);

  async function login(email: string, password: string) {
    setIsLoading(true);
    try {
      const { token, user } = await authApi.login(email, password);
      localStorage.setItem(TOKEN_KEY, token);
      setUser(user);
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    try {
      await authApi.logout();
    } finally {
      localStorage.removeItem(TOKEN_KEY);
      setUser(null);
    }
  }
  return (
    <AuthContext.Provider
      value={{ user, isLoading, isInitializing, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
