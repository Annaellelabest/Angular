// Structure de l'objet MarvelCreator
export interface MarvelCreator {
    thumbnail: {
      path: string;
      extension: string;
    };
    urls: {
      url: string;
    }[];
    fullName: string;
    description: string;
  }