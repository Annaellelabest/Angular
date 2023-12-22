// Structure de l'objet Comic
export interface Comic {
    title: string;
    description: string;
    thumbnail: {
      path: string;
      extension: string;
    };
  }