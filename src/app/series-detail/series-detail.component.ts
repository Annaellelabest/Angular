import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MarvelSeries } from '../MarvelSeries';
import { Character } from '../Character';
import { Comic } from '../Comic';
import { Creator } from '../Creator';



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

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const seriesId = params.get('id');
      if (seriesId) {
        const seriesUrl = `https://gateway.marvel.com/v1/public/series/${seriesId}?ts=1&apikey=eff0bf634828b9b11ad00a5c23f96be3&hash=6243916182e91659aa5ee22aef120b20`;
        const charactersUrl = `https://gateway.marvel.com/v1/public/series/${seriesId}/characters?ts=1&apikey=eff0bf634828b9b11ad00a5c23f96be3&hash=6243916182e91659aa5ee22aef120b20`;
        const comicsUrl = `https://gateway.marvel.com/v1/public/series/${seriesId}/comics?ts=1&apikey=eff0bf634828b9b11ad00a5c23f96be3&hash=6243916182e91659aa5ee22aef120b20`;
        const creatorsUrl = `https://gateway.marvel.com/v1/public/series/${seriesId}/creators?ts=1&apikey=eff0bf634828b9b11ad00a5c23f96be3&hash=6243916182e91659aa5ee22aef120b20`;

        // Fetch character details
        this.http.get(seriesUrl).subscribe(
          (seriesResponse: any) => {
            this.selectedSeries = seriesResponse.data.results[0];
          },
          error => {
            console.error('Error fetching character details:', error);
          }
        );

        // Fetch comics for the character
        this.http.get(charactersUrl).subscribe(
          (charactersResponse: any) => {
            this.characters = charactersResponse.data.results;
          },
          error => {
            console.error('Error fetching characters:', error);
          }
        );

        // Fetch comics for the character
        this.http.get(comicsUrl).subscribe(
          (comicsResponse: any) => {
            this.comics = comicsResponse.data.results;
          },
          error => {
            console.error('Error fetching comics:', error);
          }
        );

        // Fetch creator for the character
        this.http.get(creatorsUrl).subscribe(
          (creatorsResponse: any) => {
            this.creators = creatorsResponse.data.results;
          },
          error => {
            console.error('Error fetching creators:', error);
          }
        );
      }
    });
  }

  getThumbnailUrl(comic: MarvelSeries): string {
    return `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
  }

  
}
