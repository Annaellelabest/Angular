export interface MarvelEvent {
    thumbnail: {
      path: string;
      extension: string;
    };
    urls: {
      url: string;
    }[];
    title: string;
    description: string;
  }