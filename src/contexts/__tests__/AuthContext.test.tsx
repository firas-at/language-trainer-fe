import { act, renderHook } from "@testing-library/react";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { authService } from "@/services/auth.service";
import { ReactNode } from "react";

// Mock the auth service
jest.mock("@/services/auth.service", () => ({
  authService: {
    getToken: jest.fn(),
    setToken: jest.fn(),
    removeToken: jest.fn(),
    signIn: jest.fn(),
    signUp: jest.fn(),
  },
}));

const wrapper = ({ children }: { children: ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe("AuthContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Initial state", () => {
    it("should start with null user and not authenticated", () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBeFalsy();
    });

    it("should check for existing token on mount", () => {
      (authService.getToken as jest.Mock).mockReturnValue("existing-token");

      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(authService.getToken).toHaveBeenCalled();
      expect(result.current.isAuthenticated).toBeTruthy();
    });
  });

  describe("signIn", () => {
    it("should sign in user successfully", async () => {
      const mockUser = { id: 1, username: "testuser" };
      const mockResponse = { user: mockUser, token: "test-token" };
      (authService.signIn as jest.Mock).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useAuth(), { wrapper });

      await act(async () => {
        await result.current.signIn("testuser", "password");
      });

      expect(authService.signIn).toHaveBeenCalledWith({
        username: "testuser",
        password: "password",
      });
      expect(authService.setToken).toHaveBeenCalledWith("test-token");
      expect(result.current.user).toEqual(mockUser);
      expect(result.current.isAuthenticated).toBeTruthy();
    });

    it("should throw error on failed sign in", async () => {
      (authService.signIn as jest.Mock).mockRejectedValue(
        new Error("Invalid credentials")
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      await expect(
        act(async () => {
          await result.current.signIn("testuser", "wrong-password");
        })
      ).rejects.toThrow("Invalid credentials");
    });
  });

  describe("signUp", () => {
    it("should sign up user successfully", async () => {
      const mockUser = { id: 1, username: "newuser" };
      const mockResponse = { user: mockUser, token: "new-token" };
      (authService.signUp as jest.Mock).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useAuth(), { wrapper });

      await act(async () => {
        await result.current.signUp("newuser", "Test User", "password");
      });

      expect(authService.signUp).toHaveBeenCalledWith({
        username: "newuser",
        fullName: "Test User",
        password: "password",
      });
      expect(authService.setToken).toHaveBeenCalledWith("new-token");
      expect(result.current.user).toEqual(mockUser);
      expect(result.current.isAuthenticated).toBeTruthy();
    });
  });

  describe("signOut", () => {
    it("should sign out user successfully", async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      act(() => {
        result.current.signOut();
      });

      expect(authService.removeToken).toHaveBeenCalled();
      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBeFalsy();
    });
  });

  describe("useAuth hook", () => {
    it("should throw error when used outside AuthProvider", () => {
      // Suppress console.error for this test
      const consoleSpy = jest.spyOn(console, "error");
      consoleSpy.mockImplementation(() => {});

      expect(() => {
        renderHook(() => useAuth());
      }).toThrow("useAuth must be used within an AuthProvider");

      // Restore console.error
      consoleSpy.mockRestore();
    });
  });
});
