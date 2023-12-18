import { MarvelCharacter } from "./MarvelCharacter";

export interface MarvelData {
    attributionHTML: string;
    data: {
      results: MarvelCharacter[];
      total: number; 
    };
  }