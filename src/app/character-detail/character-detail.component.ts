import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MarvelCharacter } from '../MarvelCharacter';
import { Comic } from '../Comic';
import { Series } from '../Series';
import { VariablesGlobales } from '../variablesGlobale';



@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})

export class CharacterDetailComponent implements OnInit {
  selectedCharacter: MarvelCharacter | undefined;
  comics: Comic[] = [];
  series: Series[] = [];
  events: Event[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private Global: VariablesGlobales) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const characterId = params.get('id');
      if (characterId) {
        const characterUrl = this.Global.apiUrl+`/characters/${characterId}?ts=1&apikey=${this.Global.apiKey}&hash=${this.Global.hash}`;
        const comicsUrl =this.Global.apiUrl+ `/characters/${characterId}/comics?ts=1&apikey=${this.Global.apiKey}&hash=${this.Global.hash}`;
        const seriesUrl = this.Global.apiUrl+`/characters/${characterId}/series?ts=1&apikey=${this.Global.apiKey}&hash=${this.Global.hash}`;
        const eventsUrl = this.Global.apiUrl+`/characters/${characterId}/events?ts=1&apikey=${this.Global.apiKey}&hash=${this.Global.hash}`;

  
        this.http.get(characterUrl).subscribe(
          (characterResponse: any) => {
            this.selectedCharacter = characterResponse.data.results[0];
          },
          error => {
            console.error('Error fetching character details:', error);
          }
        );

        this.http.get(comicsUrl).subscribe(
          (comicsResponse: any) => {
            this.comics = comicsResponse.data.results;
          },
          error => {
            console.error('Error fetching comics:', error);
          }
        );


           this.http.get(seriesUrl).subscribe(
            (seriesResponse: any) => {
              this.series = seriesResponse.data.results;
            },
            error => {
              console.error('Error fetching <series>:', error);
            }
          );

          this.http.get(eventsUrl).subscribe(
            (eventsResponse: any) => {
              this.events = eventsResponse.data.results;
            },
            error => {
              console.error('Error fetching events:', error);
            }
          );
      }
    });


  }

  getThumbnailUrl(character: MarvelCharacter): string {
    return `${character.thumbnail.path}.${character.thumbnail.extension}`;
  }
}
