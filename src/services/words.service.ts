import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface WordInfo {
  key: string;
  type: string;
  info: JSON;
}

class WordsService {
  async getUserWords(token: string): Promise<WordInfo[]> {
    const response = await axios.get(`${API_URL}/user-words`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    return response.data;
  }
}

export const wordsService = new WordsService();
