"use client";
import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      setIsLoading(false);
      return;
    }

    try {
      await signUp(formData.username, formData.fullName, formData.password);
      router.push("/"); // or wherever you want to redirect after signup
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div className="text-center">
          <Typography
            component="h1"
            variant="h5"
            className="text-2xl font-bold"
          >
            Sign up
          </Typography>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert severity="error" className="mb-4">
              {error}
            </Alert>
          )}

          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={formData.username}
            onChange={handleChange}
            disabled={isLoading}
            className="bg-white dark:bg-gray-700"
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="fullName"
            label="Full Name"
            name="fullName"
            autoComplete="fullName"
            autoFocus
            value={formData.fullName}
            onChange={handleChange}
            disabled={isLoading}
            className="bg-white dark:bg-gray-700"
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
            className="bg-white dark:bg-gray-700"
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={isLoading}
            className="bg-white dark:bg-gray-700"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 py-3 rounded-lg"
          >
            {isLoading ? (
              <CircularProgress size={24} className="text-white" />
            ) : (
              "Sign In"
            )}
          </Button>

          <div className="text-center mt-4">
            <Link
              href="/signin"
              className="text-blue-500 hover:text-blue-600 text-sm"
            >
              Already have an account? Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
