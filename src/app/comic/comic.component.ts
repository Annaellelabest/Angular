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
export interface Comic {
  title: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}


@Component({
  selector: 'app-comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.css']
})
export class ComicComponent {

  @Input() comic: any | undefined;
  currentImageIndex: number = 0; // Initialize the index
  @Input() characters: MarvelCharacter[] = [];
  @Input() comics: Comic[] = [];



  getThumbnailUrl(comic: MarvelCharacter): string {
    return `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
  }
  shouldDisplayThumbnail(comic: MarvelCharacter): boolean {
    const thumbnailUrl = this.getThumbnailUrl(comic);
    return !!thumbnailUrl && !thumbnailUrl.includes('image_not_available.jpg');
  }

  shouldDisplayTitle(comic: MarvelCharacter): boolean {

    return !!comic?.title && !comic.title.includes('Example');
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
  
