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

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(false);
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
            Sign in
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
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
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
              href="/signup"
              className="text-blue-500 hover:text-blue-600 text-sm"
            >
              Don&apos;t have an account? Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
