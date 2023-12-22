// Structure de l'objet MarvelSeries
export interface MarvelSeries {
    thumbnail: {
      path: string;
      extension: string;
    };
    urls: {
      url: string;
    }[];
    fullTitle: string;
    title:string;
    description: string;
  }