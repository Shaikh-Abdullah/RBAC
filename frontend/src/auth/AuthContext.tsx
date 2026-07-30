import { createContext, useState, type ReactNode } from "react";
import * as authApi from "./api";
import type { AuthUser } from "./api";
import { TOKEN_KEY } from "../lib/api/interceptors";

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
