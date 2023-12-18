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
  currentImageIndex: number = 0; // Initialize the index
  @Input() characters: MarvelComic[] = [];
  @Input() comics: Comic[] = [];



  getThumbnailUrl(comic: MarvelComic): string {
    return `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
  }
  shouldDisplayThumbnail(comic: MarvelComic): boolean {
    const thumbnailUrl = this.getThumbnailUrl(comic);
    return !!thumbnailUrl && !thumbnailUrl.includes('image_not_available.jpg');
  }

  shouldDisplayTitle(comic: MarvelComic): boolean {

    return !!comic?.title && !comic.title.includes('Example');
  }
showNextImage() {
    let nextIndex = (this.currentImageIndex + 1) % this.characters.length;

    while (nextIndex !== this.currentImageIndex && !this.shouldDisplayThumbnail(this.characters[nextIndex])) {
      nextIndex = (nextIndex + 1) % this.characters.length;
    }

    // Update the current index and check if we have an image to display
    this.currentImageIndex = nextIndex;

    // If there's still no valid thumbnail, move to the next image
    if (!this.shouldDisplayThumbnail(this.characters[this.currentImageIndex])) {
      this.showNextImage();
    }
  }

}
  
