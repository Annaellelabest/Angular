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

// Récupération de l'URL de la miniature du serie
  getThumbnailUrl(serie: MarvelSeries): string {
    return `${serie.thumbnail.path}.${serie.thumbnail.extension}`;
  }
  
}
  
