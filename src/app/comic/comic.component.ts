import { Component, Input } from '@angular/core';

export interface MarvelCharacter {
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

@Component({
  selector: 'app-comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.css']
})
export class ComicComponent {

  @Input() comic: any | undefined;

  getThumbnailUrl(comic: MarvelCharacter): string {
    return `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
  }
  
}
