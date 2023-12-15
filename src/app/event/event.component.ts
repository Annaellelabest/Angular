import { Component, Input } from '@angular/core';

export interface MarvelCharacter {
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

export interface Event {
  title: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {

  @Input() event: any | undefined;
  currentImageIndex: number = 0;
  @Input() characters: MarvelCharacter[] = [];
  @Input() events: Event[] = [];

  charactersPerPage: number = 72; // Adjust the number of characters per page

  getThumbnailUrl(event: Event): string {
    return `${event.thumbnail.path}.${event.thumbnail.extension}`;
  }

  shouldDisplayThumbnail(event: Event): boolean {
    const thumbnailUrl = this.getThumbnailUrl(event);
    return !!thumbnailUrl && !thumbnailUrl.includes('image_not_available.jpg');
  }

  shouldDisplayTitle(event: Event): boolean {
    return !!event?.title && !event.title.includes('Example');
  }

  showNextImage() {
    let nextIndex = (this.currentImageIndex + 1) % this.events.length;

    while (nextIndex !== this.currentImageIndex && !this.shouldDisplayThumbnail(this.events[nextIndex])) {
      nextIndex = (nextIndex + 1) % this.events.length;
    }

    // Update the current index and check if we have an image to display
    this.currentImageIndex = nextIndex;

    // If there's still no valid thumbnail, move to the next image
    if (!this.shouldDisplayThumbnail(this.events[this.currentImageIndex])) {
      this.showNextImage();
    }
  }
}
