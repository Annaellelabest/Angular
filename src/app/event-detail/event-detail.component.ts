import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MarvelEvent } from '../MarvelEvent';
import { Character } from '../Character';
import { Comic } from '../Comic';
import { Creator } from '../Creator';


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

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const eventId = params.get('id');
      if (eventId) {
        const eventUrl = `https://gateway.marvel.com/v1/public/events/${eventId}?ts=1&apikey=eff0bf634828b9b11ad00a5c23f96be3&hash=6243916182e91659aa5ee22aef120b20`;
        const charactersUrl = `https://gateway.marvel.com/v1/public/events/${eventId}/characters?ts=1&apikey=eff0bf634828b9b11ad00a5c23f96be3&hash=6243916182e91659aa5ee22aef120b20`;
        const comicsUrl = `https://gateway.marvel.com/v1/public/events/${eventId}/comics?ts=1&apikey=eff0bf634828b9b11ad00a5c23f96be3&hash=6243916182e91659aa5ee22aef120b20`;
        const creatorsUrl = `https://gateway.marvel.com/v1/public/events/${eventId}/creators?ts=1&apikey=eff0bf634828b9b11ad00a5c23f96be3&hash=6243916182e91659aa5ee22aef120b20`;

        // Fetch character details
        this.http.get(eventUrl).subscribe(
          (eventResponse: any) => {
            this.selectedEvent = eventResponse.data.results[0];
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

  getThumbnailUrl(comic: MarvelEvent): string {
    return `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
  }

  
}
