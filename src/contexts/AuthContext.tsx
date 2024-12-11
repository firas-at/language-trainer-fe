"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { authService, AuthResponse } from "@/services/auth.service";

interface AuthContextType {
  user: AuthResponse["user"] | null;
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (
    username: string,
    fullName: string,
    password: string
  ) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthResponse["user"] | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = authService.getToken();
    if (token) {
      // Here you might want to validate the token with the backend
      setIsAuthenticated(true);
      setToken(token);
    }
  }, []);

  const signIn = async (username: string, password: string) => {
    const response = await authService.signIn({ username, password });
    authService.setToken(response.token);
    setUser(response.user);
    setIsAuthenticated(true);
    setToken(response.token);
  };

  const signUp = async (
    username: string,
    fullName: string,
    password: string
  ) => {
    const response = await authService.signUp({ username, fullName, password });
    authService.setToken(response.token);
    setUser(response.user);
    setIsAuthenticated(true);
    setToken(response.token);
  };

  const signOut = () => {
    authService.removeToken();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, signIn, signUp, signOut, isAuthenticated, token }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
