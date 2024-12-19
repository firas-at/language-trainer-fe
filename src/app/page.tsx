"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { wordsService, UserWordItem } from "@/services/words.service";
import UserWordsTable from "./components/UserWordsTable";
import { WordType } from "@/services/responses/word_type";
import WordFilter from "./components/WordFilter";

export default function Home() {
  const { isAuthenticated, user, signOut, token } = useAuth();
  const router = useRouter();
  const [words, setWords] = useState<UserWordItem[]>([]);
  const [newWord, setNewWord] = useState("");
  const [isAddingWord, setIsAddingWord] = useState(false);
  const [selectedType, setSelectedType] = useState<WordType | "">("");

  const fetchWords = async () => {
    try {
      const userWords = await wordsService.getUserWords(token!);
      setWords(userWords);
    } catch (error) {
      console.error("Failed to fetch words:", error);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/signin");
    } else {
      fetchWords();
    }
  }, [isAuthenticated, router, token]);

  const handleAddWord = async () => {
    if (!newWord.trim()) return;

    setIsAddingWord(true);
    try {
      await wordsService.addWord(token!, newWord.trim());
      setNewWord("");
      await fetchWords();
    } catch (error) {
      console.error("Failed to add word:", error);
    } finally {
      setIsAddingWord(false);
    }
  };

  const filteredWords = selectedType
    ? words.filter((word) => word.type === selectedType)
    : words;

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-3xl font-bold mb-6">Welcome, {user?.fullName}</div>

      <div className="w-full max-w-4xl mb-4">
        <div className="flex gap-2">
          <WordFilter
            selectedType={selectedType}
            onTypeChange={setSelectedType}
          />
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
            {isAddingWord ? "Adding..." : "Add"}
          </button>
        </div>
      </div>

      <UserWordsTable words={filteredWords} filterType={selectedType} />

      <button
        onClick={() => signOut()}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
