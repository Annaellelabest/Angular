import { Component,Input } from '@angular/core';
import { MarvelCreator } from '../MarvelCreator';
import { Creator } from '../Creator';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css']
})
export class CreatorComponent {

  @Input() creator: any | undefined;
  currentImageIndex: number = 0; 
  @Input() characters: MarvelCreator[] = [];
  @Input() creators: Creator[] = [];


// Récupération de l'URL de la miniature du creator
  getThumbnailUrl(creator: MarvelCreator): string {
    return `${creator.thumbnail.path}.${creator.thumbnail.extension}`;
  }

}
  
