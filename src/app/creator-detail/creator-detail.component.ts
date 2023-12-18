import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MarvelCreator } from '../MarvelCreator';
import { Character } from '../Character';
import { Comic } from '../Comic';


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

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const creatorId = params.get('id');
      if (creatorId) {
        const eventUrl = `https://gateway.marvel.com/v1/public/creators/${creatorId}?ts=1&apikey=eff0bf634828b9b11ad00a5c23f96be3&hash=6243916182e91659aa5ee22aef120b20`;
        const charactersUrl = `https://gateway.marvel.com/v1/public/creators/${creatorId}/characters?ts=1&apikey=eff0bf634828b9b11ad00a5c23f96be3&hash=6243916182e91659aa5ee22aef120b20`;
        const comicsUrl = `https://gateway.marvel.com/v1/public/creators/${creatorId}/comics?ts=1&apikey=eff0bf634828b9b11ad00a5c23f96be3&hash=6243916182e91659aa5ee22aef120b20`;
        const eventsUrl = `https://gateway.marvel.com/v1/public/creators/${creatorId}/series?ts=1&apikey=eff0bf634828b9b11ad00a5c23f96be3&hash=6243916182e91659aa5ee22aef120b20`;

        // Fetch character details
        this.http.get(eventUrl).subscribe(
          (creatorResponse: any) => {
            this.selectedCreator = creatorResponse.data.results[0];
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
