// character-detail.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


export interface MarvelComic{
  id: number;
  title: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  urls: {
    url: string;
  }[];
}

export interface character {
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}


export interface creator {
  fullName: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
  styleUrls: ['./comic-detail.component.css']
})

export class ComicDetailComponent implements OnInit {
  selectedComic: MarvelComic| undefined;
  characters: character[] = [];
  creators: creator[] = [];


  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const comicId = params.get('id');
      if (comicId) {
        const comicUrl = `https://gateway.marvel.com/v1/public/comics/${comicId}?ts=1&apikey=eff0bf634828b9b11ad00a5c23f96be3&hash=6243916182e91659aa5ee22aef120b20`;
        const charactersUrl = `https://gateway.marvel.com/v1/public/comics/${comicId}/characters?ts=1&apikey=eff0bf634828b9b11ad00a5c23f96be3&hash=6243916182e91659aa5ee22aef120b20`;
        const creatorsUrl = `https://gateway.marvel.com/v1/public/comics/${comicId}/creators?ts=1&apikey=eff0bf634828b9b11ad00a5c23f96be3&hash=6243916182e91659aa5ee22aef120b20`;
       

        // Fetch character details
        this.http.get(comicUrl).subscribe(
          (comicResponse: any) => {
            this.selectedComic = comicResponse.data.results[0];
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

        this.http.get(creatorsUrl).subscribe(
          (creatorsResponse: any) => {
            this.creators = creatorsResponse.data.results;
          },
          error => {
            console.error('Error fetching characters:', error);
          }
        );

  
      }
    });
  }

  getThumbnailUrl(comic: MarvelComic): string {
    return `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
  }
}
