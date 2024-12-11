import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { wordsService } from "../words.service";

const mock = new MockAdapter(axios);
const API_URL = process.env.NEXT_PUBLIC_API_URL;

describe("WordsService", () => {
  beforeEach(() => {
    mock.reset();
    jest.clearAllMocks();
  });

  describe("getUserWords", () => {
    const mockToken = "test-token";
    const mockResponse = [
      {
        key: "hello",
        type: "noun",
        info: {},
        wordUsers: [],
      },
    ];

    it("should successfully fetch user words", async () => {
      mock.onGet(`${API_URL}/user-words`).reply(200, mockResponse);

      const response = await wordsService.getUserWords(mockToken);

      expect(response).toEqual(mockResponse);
      expect(mock.history.get[0].headers?.Authorization).toBe(
        `Bearer ${mockToken}`,
      );
      expect(mock.history.get[0].headers?.Accept).toBe("application/json");
    });

    it("should throw error when unauthorized", async () => {
      mock.onGet(`${API_URL}/user-words`).reply(401);

      await expect(wordsService.getUserWords(mockToken)).rejects.toThrow();
    });
  });
});
