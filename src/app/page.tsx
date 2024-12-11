"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { wordsService, WordInfo } from "@/services/words.service";

export default function Home() {
  const { isAuthenticated, user, signOut, token } = useAuth();
  const router = useRouter();
  const [words, setWords] = useState<WordInfo[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/signin');
    } else {
      // Fetch words when authenticated
      const fetchWords = async () => {
        try {
          const userWords = await wordsService.getUserWords(token!);
          setWords(userWords);
        } catch (error) {
          console.error('Failed to fetch words:', error);
        }
      };
      fetchWords();
    }
  }, [isAuthenticated, router, token]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-3xl font-bold mb-6">Welcome, {user?.fullName}</div>
      
      <div className="w-full max-w-4xl overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plural Form</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {words.map((word) => (
              <tr key={word.key}>
                <td className="px-6 py-4 whitespace-nowrap text-black">{word.key}</td>
                <td className="px-6 py-4 whitespace-nowrap text-black">{word.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-black">{(word.info as unknown as { gender: string }).gender}</td>
                <td className="px-6 py-4 whitespace-nowrap text-black">{(word.info as unknown as { plural_form: string }).plural_form}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={() => signOut()}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
