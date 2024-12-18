"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { wordsService, UserWordItem } from "@/services/words.service";

export default function Home() {
  const { isAuthenticated, user, signOut, token } = useAuth();
  const router = useRouter();
  const [words, setWords] = useState<UserWordItem[]>([]);
  const [newWord, setNewWord] = useState('');
  const [isAddingWord, setIsAddingWord] = useState(false);

  const fetchWords = async () => {
    try {
      const userWords = await wordsService.getUserWords(token!);
      setWords(userWords);
    } catch (error) {
      console.error('Failed to fetch words:', error);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/signin');
    } else {
      fetchWords();
    }
  }, [isAuthenticated, router, token]);

  const handleAddWord = async () => {
    if (!newWord.trim()) return;
    
    setIsAddingWord(true);
    try {
      await wordsService.addWord(token!, newWord.trim());
      setNewWord('');
      await fetchWords();
    } catch (error) {
      console.error('Failed to add word:', error);
    } finally {
      setIsAddingWord(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-3xl font-bold mb-6">Welcome, {user?.fullName}</div>
      
      <div className="w-full max-w-4xl mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
            placeholder="Enter a new word"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddWord}
            disabled={isAddingWord}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center"
          >
            {isAddingWord ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding...
              </>
            ) : (
              'Add'
            )}
          </button>
        </div>
      </div>

      <div className="w-full max-w-4xl overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Example</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Translation</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {words.map((word) => (
              <tr key={word.key}>
                <td className="px-6 py-4 whitespace-nowrap text-black">{word.key}</td>
                <td className="px-6 py-4 whitespace-nowrap text-black">{word.type}</td>
                <td className="px-6 py-4 text-black">{word.info.sentence_example}</td>
                <td className="px-6 py-4 text-black">{word.info.translation}</td>
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
