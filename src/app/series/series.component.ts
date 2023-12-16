import { Component , Input} from '@angular/core';



export interface MarvelCharacter {
  thumbnail: {
    path: string;
    extension: string;
  };
  urls: {
    url: string;
  }[];
  fullTitle: string;
  description: string;
}
export interface Serie {
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}


@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent {


  @Input() serie: any | undefined;
  currentImageIndex: number = 0; // Initialize the index
  @Input() characters: MarvelCharacter[] = [];
  @Input() series: Serie[] = [];



  getThumbnailUrl(serie: MarvelCharacter): string {
    return `${serie.thumbnail.path}.${serie.thumbnail.extension}`;
  }
  shouldDisplayThumbnail(serie: MarvelCharacter): boolean {
    const thumbnailUrl = this.getThumbnailUrl(serie);
    return !!thumbnailUrl && !thumbnailUrl.includes('image_not_available.jpg');
  }

  shouldDisplayTitle(serie: MarvelCharacter): boolean {

    return !!serie?.fullTitle && !serie.fullTitle.includes('Example');
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
  
