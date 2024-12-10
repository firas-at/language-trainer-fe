"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import React from "react";

export default function Home() {
  const { isAuthenticated, user, signOut } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/signin');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-3xl font-bold">
      <div>Welcome, Logged in user! {user?.fullName}</div>
      <button
        onClick={() => signOut()}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
