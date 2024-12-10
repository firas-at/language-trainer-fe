"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, AuthResponse } from '@/services/auth.service';

interface AuthContextType {
  user: AuthResponse['user'] | null;
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (username: string, fullName: string, password: string) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthResponse['user'] | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = authService.getToken();
    if (token) {
      // Here you might want to validate the token with the backend
      setIsAuthenticated(true);
    }
  }, []);

  const signIn = async (username: string, password: string) => {
    const response = await authService.signIn({ username, password });
    authService.setToken(response.token);
    setUser(response.user);
    setIsAuthenticated(true);
  };

  const signUp = async (username: string, fullName: string, password: string) => {
    const response = await authService.signUp({ username, fullName, password });
    authService.setToken(response.token);
    setUser(response.user);
    setIsAuthenticated(true);
  };

  const signOut = () => {
    authService.removeToken();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 