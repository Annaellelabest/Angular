import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarvelSeries } from '../MarvelSeries';
import { Character } from '../Character';
import { Comic } from '../Comic';
import { Creator } from '../Creator';
import { MarvelDetailServices } from '../detail.services';


@Component({
  selector: 'app-series-detail',
  templateUrl: './series-detail.component.html',
  styleUrls: ['./series-detail.component.css']
})
export class SeriesDetailComponent implements OnInit {

  selectedSeries: MarvelSeries| undefined;
  characters: Character[] = [];
  comics: Comic[] = [];
  creators: Creator[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private marvelDetailServices: MarvelDetailServices) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const seriesId = params.get('id');
      if (seriesId) {
        // Récupération des détails de la série
        this.marvelDetailServices.getDetails('series', seriesId).subscribe(
          (seriesResponse: any) => {
            this.selectedSeries = seriesResponse.data.results[0];
          },
          (error) => {
            console.error('Error fetching series details:', error);
          }
        );
// Récupération des personnages liés à la série
        this.marvelDetailServices.getRelated('series', seriesId, 'characters').subscribe(
          (charactersResponse: any) => {
            this.characters = charactersResponse.data.results;
          },
          (error) => {
            console.error('Error fetching characters:', error);
          }
        );
// Récupération des comics liés à la série
        this.marvelDetailServices.getRelated('series', seriesId, 'comics').subscribe(
          (comicsResponse: any) => {
            this.comics = comicsResponse.data.results;
          },
          (error) => {
            console.error('Error fetching comics:', error);
          }
        );
// Récupération des créateurs liés à la série
        this.marvelDetailServices.getRelated('series', seriesId, 'creators').subscribe(
          (creatorsResponse: any) => {
            this.creators = creatorsResponse.data.results;
          },
          (error) => {
            console.error('Error fetching creators:', error);
          }
        );
      }
    });
  }

  // Récupération de l'URL de l'image de la série
  getThumbnailUrl(comic: MarvelSeries): string {
    return `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
  }

  // Retour à la page series
  goBack() {
    this.router.navigate(['/series']);
  }

  
}
