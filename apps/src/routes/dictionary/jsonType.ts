export interface Phonetic {
  text: string;
  audio: string;
  sourceUrl?: string;
  license?: {
    name: string;
    url: string;
  };
}

export interface MeaningDefinition {
  definition: string;
  synonyms: string[];
  antonyms: string[];
  example?: string;
}

export interface Meaning {
  partOfSpeech: string;
  definitions: MeaningDefinition[];
  synonyms: string[];
  antonyms: string[];
}

export interface DictType {
  error?: string;
  word: string;
  phonetic: string;
  phonetics: Phonetic[];
  meanings: Meaning[];
  synonyms: string[];
  antonyms: string[];
  license: {
    name: string;
    url: string;
  };
  sourceUrls: string[];
}
