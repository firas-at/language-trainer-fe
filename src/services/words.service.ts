import axios from "axios";
import { VerbInfo } from "./responses/verb_info";
import { NounInfo } from "./responses/noun_info";
import { AdjectiveInfo } from "./responses/adjective_info";
import { WordInfo } from "./responses/word_info";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface UserWordItem {
  key: string;
  type: string;
  info: WordInfo;
}

export interface AddWordRequest {
  word: string;
}

class WordsService {
  async getUserWords(token: string): Promise<UserWordItem[]> {
    const response = await axios.get(`${API_URL}/user-words`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
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
