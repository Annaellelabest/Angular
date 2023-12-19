import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MarvelSeries } from '../MarvelSeries';
import { Character } from '../Character';
import { Comic } from '../Comic';
import { Creator } from '../Creator';
import { VariablesGlobales } from '../variablesGlobale';



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

  constructor(private route: ActivatedRoute, private http: HttpClient, private Global: VariablesGlobales) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const seriesId = params.get('id');
      if (seriesId) {
        const seriesUrl = this.Global.apiUrl+`/series/${seriesId}?ts=1&apikey=${this.Global.apiKey}&hash=${this.Global.hash}`;
        const charactersUrl = this.Global.apiUrl+`/series/${seriesId}/characters?ts=1&apikey=${this.Global.apiKey}&hash=${this.Global.hash}`;
        const comicsUrl = this.Global.apiUrl+`/series/${seriesId}/comics?ts=1&apikey=${this.Global.apiKey}&hash=${this.Global.hash}`;
        const creatorsUrl = this.Global.apiUrl+`/series/${seriesId}/creators?ts=1&apikey=${this.Global.apiKey}&hash=${this.Global.hash}`;

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
