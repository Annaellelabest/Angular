import { Component , Input} from '@angular/core';
import { MarvelSeries } from '../MarvelSeries';
import { Series } from '../Series';


@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent {


  @Input() serie: any | undefined;
  currentImageIndex: number = 0; // Initialize the index
  @Input() characters: MarvelSeries[] = [];
  @Input() series: Series[] = [];



  getThumbnailUrl(serie: MarvelSeries): string {
    return `${serie.thumbnail.path}.${serie.thumbnail.extension}`;
  }
  shouldDisplayThumbnail(serie: MarvelSeries): boolean {
    const thumbnailUrl = this.getThumbnailUrl(serie);
    return !!thumbnailUrl && !thumbnailUrl.includes('image_not_available.jpg');
  }

  shouldDisplayTitle(serie: MarvelSeries): boolean {

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
  
