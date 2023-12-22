import { Component, Input} from '@angular/core';
import { MarvelEvent } from '../MarvelEvent';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {

  @Input() event: any | undefined;
  currentImageIndex: number = 0; 
  @Input() characters: MarvelEvent[] = [];
  @Input() events: Event[] = [];


// Récupération de l'URL de la miniature du event
  getThumbnailUrl(event: MarvelEvent): string {
    return `${event.thumbnail.path}.${event.thumbnail.extension}`;
  }
  
}
  
