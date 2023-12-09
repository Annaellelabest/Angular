import { Component,Input } from '@angular/core';

export interface MarvelCharacter {
  thumbnail: {
    path: string;
    extension: string;
  };
  urls: {
    url: string;
  }[];
  fullName: string;
  description: string;
}
export interface Creator {
  fullName: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css']
})
export class CreatorComponent {

  @Input() creator: any | undefined;
  currentImageIndex: number = 0; // Initialize the index
  @Input() characters: MarvelCharacter[] = [];
  @Input() creators: Creator[] = [];



  getThumbnailUrl(creator: MarvelCharacter): string {
    return `${creator.thumbnail.path}.${creator.thumbnail.extension}`;
  }
  shouldDisplayThumbnail(creator: MarvelCharacter): boolean {
    const thumbnailUrl = this.getThumbnailUrl(creator);
    return !!thumbnailUrl && !thumbnailUrl.includes('image_not_available.jpg');
  }

  shouldDisplayTitle(creator: MarvelCharacter): boolean {

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
  
