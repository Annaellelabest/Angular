import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MarvelEvent } from '../MarvelEvent';
import { Character } from '../Character';
import { Comic } from '../Comic';
import { Creator } from '../Creator';
import { VariablesGlobales } from '../variablesGlobale';


@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  selectedEvent: MarvelEvent| undefined;
  characters: Character[] = [];
  comics: Comic[] = [];
  creators: Creator[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private Global:VariablesGlobales) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const eventId = params.get('id');
      if (eventId) {
        const eventUrl = this.Global.apiUrl+`/events/${eventId}?ts=1&apikey=${this.Global.apiKey}&hash=${this.Global.hash}`;
        const charactersUrl = this.Global.apiUrl+`/events/${eventId}/characters?ts=1&apikey=${this.Global.apiKey}&hash=${this.Global.hash}`;
        const comicsUrl = this.Global.apiUrl+`/events/${eventId}/comics?ts=1&apikey=${this.Global.apiKey}&hash=${this.Global.hash}`;
        const creatorsUrl = this.Global.apiUrl+`/events/${eventId}/creators?ts=1&apikey=${this.Global.apiKey}&hash=${this.Global.hash}`;

      
        this.http.get(eventUrl).subscribe(
          (eventResponse: any) => {
            this.selectedEvent = eventResponse.data.results[0];
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

  getThumbnailUrl(comic: MarvelEvent): string {
    return `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
  }

  
}
