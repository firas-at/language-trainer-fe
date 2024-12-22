import { WordType } from "./word_type";

export class WordInfo {
  translation: string;
  sentence_example: string;
  type: WordType;

  constructor(
    translation: string = "",
    sentence_example: string = "",
    type: WordType,
  ) {
    this.translation = translation;
    this.sentence_example = sentence_example;
    this.type = type;
  }
}
