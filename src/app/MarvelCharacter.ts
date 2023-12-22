// Structure de l'objet MarvelCharacter
export interface MarvelCharacter {
    id: number;
    thumbnail: {
      path: string;
      extension: string;
    };
    urls: {
      url: string;
    }[];
    name: string;
    description: string;
  }