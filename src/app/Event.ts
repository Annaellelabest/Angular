// Structure de l'objet Event
export interface Event {
    title: string;
    description: string;
    thumbnail: {
      path: string;
      extension: string;
    };
  }
  