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
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent {

  @Input() character: any | undefined;

  getThumbnailUrl(character: MarvelCharacter): string {
    return `${character.thumbnail.path}.${character.thumbnail.extension}`;
  }
  
}
