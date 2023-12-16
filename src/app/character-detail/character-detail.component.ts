// character-detail.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export interface MarvelCharacter {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  urls: {
    url: string;
  }[];
}

export interface Comic {
  title: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

export interface Series {
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

export interface Event {
  title: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}





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

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const characterId = params.get('id');
      if (characterId) {
        const characterUrl = `https://gateway.marvel.com/v1/public/characters/${characterId}?ts=1&apikey=eff0bf634828b9b11ad00a5c23f96be3&hash=6243916182e91659aa5ee22aef120b20`;
        const comicsUrl = `https://gateway.marvel.com/v1/public/characters/${characterId}/comics?ts=1&apikey=eff0bf634828b9b11ad00a5c23f96be3&hash=6243916182e91659aa5ee22aef120b20`;
        const seriesUrl = `https://gateway.marvel.com/v1/public/characters/${characterId}/series?ts=1&apikey=eff0bf634828b9b11ad00a5c23f96be3&hash=6243916182e91659aa5ee22aef120b20`;
        const eventsUrl = `https://gateway.marvel.com/v1/public/characters/${characterId}/events?ts=1&apikey=eff0bf634828b9b11ad00a5c23f96be3&hash=6243916182e91659aa5ee22aef120b20`;

        // Fetch character details
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
