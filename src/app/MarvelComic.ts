// Structure de l'objet MarvelComic
export interface MarvelComic {
    id: number;
    title: string;
    description: string;

    thumbnail: {
      path: string;
      extension: string;
    };
    urls: {
      url: string;
    }[];
   
  }

