// Structure de l'objet Creator
export interface Creator {
    fullName: string;
    thumbnail: {
      path: string;
      extension: string;
    };
  }