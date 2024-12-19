import React from 'react';
import { WordType } from "@/services/responses/word_type";

interface WordFilterProps {
  selectedType: WordType | '';
  onTypeChange: (type: WordType | '') => void;
}

const WordFilter: React.FC<WordFilterProps> = ({ selectedType, onTypeChange }) => {
  return (
    <select
    
      value={selectedType}
      onChange={(e) => onTypeChange(e.target.value as WordType)}
      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
    >
      <option value="">All Types</option>
      <option value={WordType.Noun}>Noun</option>
      <option value={WordType.Verb}>Verb</option>
      <option value={WordType.Adjective}>Adjective</option>
      <option value={WordType.Adverb}>Adverb</option>
    </select>
  );
};

export default WordFilter; 