import { Component, Input} from '@angular/core';
import { MarvelEvent } from '../MarvelEvent';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {

  @Input() event: any | undefined;
  currentImageIndex: number = 0; // Initialize the index
  @Input() characters: MarvelEvent[] = [];
  @Input() events: Event[] = [];



  getThumbnailUrl(event: MarvelEvent): string {
    return `${event.thumbnail.path}.${event.thumbnail.extension}`;
  }
  shouldDisplayThumbnail(event: MarvelEvent): boolean {
    const thumbnailUrl = this.getThumbnailUrl(event);
    return !!thumbnailUrl && !thumbnailUrl.includes('image_not_available.jpg');
  }

  shouldDisplayTitle(event: MarvelEvent): boolean {

    return !!event?.title && !event.title.includes('Example');
  }
showNextImage() {
    let nextIndex = (this.currentImageIndex + 1) % this.characters.length;

    while (nextIndex !== this.currentImageIndex && !this.shouldDisplayThumbnail(this.characters[nextIndex])) {
      nextIndex = (nextIndex + 1) % this.characters.length;
    }

    this.currentImageIndex = nextIndex;

    if (!this.shouldDisplayThumbnail(this.characters[this.currentImageIndex])) {
      this.showNextImage();
    }
  }

}
  
