import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MarvelCreator } from '../MarvelCreator';
import { Character } from '../Character';
import { Comic } from '../Comic';
import { VariablesGlobales } from '../variablesGlobale';


@Component({
  selector: 'app-creator-detail',
  templateUrl: './creator-detail.component.html',
  styleUrls: ['./creator-detail.component.css']
})
export class CreatorDetailComponent implements OnInit {

  selectedCreator: MarvelCreator| undefined;
  characters: Character[] = [];
  comics: Comic[] = [];
  events: Event[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private Global: VariablesGlobales) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const creatorId = params.get('id');
      if (creatorId) {
        const eventUrl = this.Global.apiUrl+`/creators/${creatorId}?ts=1&apikey=${this.Global.apiKey}&hash=${this.Global.hash}`;
        const charactersUrl = this.Global.apiUrl+`/creators/${creatorId}/characters?ts=1&apikey=${this.Global.apiKey}&hash=${this.Global.hash}`;
        const comicsUrl = this.Global.apiUrl+`/creators/${creatorId}/comics?ts=1&apikey=${this.Global.apiKey}&hash=${this.Global.hash}`;
        const eventsUrl = this.Global.apiUrl+`/creators/${creatorId}/series?ts=1&apikey=${this.Global.apiKey}&hash=${this.Global.hash}`;


        this.http.get(eventUrl).subscribe(
          (creatorResponse: any) => {
            this.selectedCreator = creatorResponse.data.results[0];
          },
          error => {
            console.error('Error fetching character details:', error);
          }
        );


        this.http.get(charactersUrl).subscribe(
          (charactersResponse: any) => {
            this.characters = charactersResponse.data.results;
          },
          error => {
            console.error('Error fetching characters:', error);
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

        // Fetch creator for the character
        this.http.get(eventsUrl).subscribe(
          (eventResponse: any) => {
            this.events = eventResponse.data.results;
          },
          error => {
            console.error('Error fetching creators:', error);
          }
        );
      }
    });
  }

  getThumbnailUrl(creator: MarvelCreator): string {
    return `${creator.thumbnail.path}.${creator.thumbnail.extension}`;
  }

  
}
