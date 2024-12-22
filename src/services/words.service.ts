import axios from "axios";
import { WordInfo } from "./responses/word_info";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface UserWordItem {
  key: string;
  type: string;
  info: WordInfo;
  createdAt: Date;
  updatedAt: Date;
}

export interface AddWordRequest {
  word: string;
}

export interface GetUserWordsRequest {
  types?: string[]; // array of word type enum
  sort_by?: "updatedAt" | "createdAt"; // sorting options
  sort_order?: "asc" | "desc"; // sorting order
}

class WordsService {
  async getUserWords(
    token: string,
    options?: GetUserWordsRequest,
  ): Promise<UserWordItem[]> {
    const response = await axios.get(`${API_URL}/user-words`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      params: options, // Add options as query parameters
    });

    return response.data;
  }

  async addWord(token: string, word: string): Promise<UserWordItem> {
    const response = await axios.post(
      `${API_URL}/user-words`,
      { word },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  }
}

export const wordsService = new WordsService();
