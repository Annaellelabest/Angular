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
  currentImageIndex: number = 0; // Initialize the index
  @Input() characters: MarvelCreator[] = [];
  @Input() creators: Creator[] = [];



  getThumbnailUrl(creator: MarvelCreator): string {
    return `${creator.thumbnail.path}.${creator.thumbnail.extension}`;
  }
  shouldDisplayThumbnail(creator: MarvelCreator): boolean {
    const thumbnailUrl = this.getThumbnailUrl(creator);
    return !!thumbnailUrl && !thumbnailUrl.includes('image_not_available.jpg');
  }

  shouldDisplayTitle(creator: MarvelCreator): boolean {

    return !!creator?.fullName && !creator.fullName.includes('Example');
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
  
