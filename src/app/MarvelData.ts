
import { MarvelCharacter } from "./MarvelCharacter";

// Structure de l'objet MarvelData
export interface MarvelData {
    attributionHTML: string;
    data: {
      results: MarvelCharacter[];
      total: number; 
    };
  }