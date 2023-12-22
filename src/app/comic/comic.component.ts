import { Component, Input } from '@angular/core';
import { MarvelComic } from '../MarvelComic';
import { Comic } from '../Comic';


@Component({
  selector: 'app-comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.css']
})
export class ComicComponent {

  @Input() comic: any | undefined;
  currentImageIndex: number = 0; 
  @Input() characters: MarvelComic[] = [];
  @Input() comics: Comic[] = [];


// Récupération de l'URL de la miniature du comic
  getThumbnailUrl(comic: MarvelComic): string {
    return `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
  }
  
}
  
