import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface SignInCredentials {
  username: string;
  password: string;
}

export interface SignUpCredentials {
  username: string;
  fullName: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    fullName: string;
  };
}

class AuthService {
  async signIn(credentials: SignInCredentials): Promise<AuthResponse> {
    const response = await axios.post(`${API_URL}/auth/signin`, credentials);
    return response.data;
  }

  async signUp(credentials: SignUpCredentials): Promise<AuthResponse> {
    const response = await axios.post(`${API_URL}/auth/signup`, credentials);
    return response.data;
  }

  setToken(token: string): void {
    localStorage.setItem("token", token);
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  removeToken(): void {
    localStorage.removeItem("token");
  }
}

export const authService = new AuthService();
