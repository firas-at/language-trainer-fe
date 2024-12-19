import React from "react";
import { UserWordItem } from "@/services/words.service";
import { VerbInfo } from "@/services/responses/verb_info";
import { NounInfo } from "@/services/responses/noun_info";
import { AdjectiveInfo } from "@/services/responses/adjective_info";
import { WordType } from "@/services/responses/word_type";

interface UserWordsTableProps {
  words: UserWordItem[];
  filterType: WordType | '';
}

const UserWordsTable: React.FC<UserWordsTableProps> = ({ words, filterType }) => {
  return (
    <div className="mx-5">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-black">Key</th>
            <th className="px-4 py-2 text-black">Type</th>
            <th className="px-4 py-2 text-black">Example</th>
            <th className="px-4 py-2 text-black">Translation</th>
            {/* Conditional columns based on filter type */}
            {filterType === "Verb" && (
              <>
                <th className="px-4 py-2 text-black">Partizip 2 Form</th>
                <th className="px-4 py-2 text-black">Auxiliary Verb</th>
                <th className="px-4 py-2 text-black">Präteritum Form</th>
              </>
            )}
            {filterType === "Noun" && (
              <>
                <th className="px-4 py-2 text-black">Gender</th>
                <th className="px-4 py-2 text-black">Plural Form</th>
              </>
            )}
            {filterType === "Adjective" && (
              <>
                <th className="px-4 py-2 text-black">Comparative</th>
                <th className="px-4 py-2 text-black">Superlative</th>
                <th className="px-4 py-2 text-black">Opposite</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {words.map((word) => (
            <tr key={word.key}>
              <td className="px-4 py-2 text-black">{word.key}</td>
              <td className="px-4 py-2 text-black">{word.type}</td>
              <td className="px-4 py-2 text-black">{word.info.sentence_example}</td>
              <td className="px-4 py-2 text-black">{word.info.translation}</td>
              {/* Conditional rendering of additional fields based on filter type */}
              {filterType === "Verb" && (
                <>
                  <td className="px-4 py-2 text-black">{(word.info as VerbInfo).partizip_2_form}</td>
                  <td className="px-4 py-2 text-black">{(word.info as VerbInfo).auxiliary_verb}</td>
                  <td className="px-4 py-2 text-black">{(word.info as VerbInfo).präteritum_form}</td>
                </>
              )}
              {filterType === "Noun" && (
                <>
                  <td className="px-4 py-2 text-black">{(word.info as NounInfo).gender}</td>
                  <td className="px-4 py-2 text-black">{(word.info as NounInfo).plural_form}</td>
                </>
              )}
              {filterType === "Adjective" && (
                <>
                  <td className="px-4 py-2 text-black">{(word.info as AdjectiveInfo).comparative}</td>
                  <td className="px-4 py-2 text-black">{(word.info as AdjectiveInfo).superlative}</td>
                  <td className="px-4 py-2 text-black">{(word.info as AdjectiveInfo).opposite}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserWordsTable;
