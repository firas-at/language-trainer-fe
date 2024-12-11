import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { authService } from "../auth.service";

const mock = new MockAdapter(axios);
const API_URL = process.env.NEXT_PUBLIC_API_URL;

describe("AuthService", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    mock.reset();
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe("signIn", () => {
    const mockCredentials = {
      username: "testuser",
      password: "password123",
    };

    const mockResponse = {
      token: "mock-token",
      user: {
        id: "1",
        username: "testuser",
        fullName: "Test User",
      },
    };

    it("should successfully sign in user", async () => {
      mock.onPost(`${API_URL}/auth/signin`).reply(200, mockResponse);

      const response = await authService.signIn(mockCredentials);

      expect(response).toEqual(mockResponse);
    });

    it("should throw error on failed sign in", async () => {
      mock.onPost(`${API_URL}/auth/signin`).reply(401);

      await expect(authService.signIn(mockCredentials)).rejects.toThrow();
    });
  });

  describe("signUp", () => {
    const mockCredentials = {
      username: "testuser",
      password: "password123",
      fullName: "Test User",
    };

    const mockResponse = {
      token: "mock-token",
      user: {
        id: "1",
        username: "testuser",
        fullName: "Test User",
      },
    };

    it("should successfully sign up user", async () => {
      mock.onPost(`${API_URL}/auth/signup`).reply(200, mockResponse);

      const response = await authService.signUp(mockCredentials);

      expect(response).toEqual(mockResponse);
    });

    it("should throw error on failed sign up", async () => {
      mock.onPost(`${API_URL}/auth/signup`).reply(400);

      await expect(authService.signUp(mockCredentials)).rejects.toThrow();
    });
  });

  describe("token management", () => {
    it("should set token in localStorage", () => {
      const token = "test-token";
      authService.setToken(token);

      expect(localStorage.setItem).toHaveBeenCalledWith("token", token);
    });

    it("should get token from localStorage", () => {
      const token = "test-token";
      localStorage.getItem = jest.fn().mockReturnValue(token);

      const result = authService.getToken();

      expect(localStorage.getItem).toHaveBeenCalledWith("token");
      expect(result).toBe(token);
    });

    it("should remove token from localStorage", () => {
      authService.removeToken();

      expect(localStorage.removeItem).toHaveBeenCalledWith("token");
    });
  });
});
