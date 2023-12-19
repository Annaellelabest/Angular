// character-detail.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MarvelComic } from '../MarvelComic';
import { Character } from '../Character';
import { Creator } from '../Creator';
import { VariablesGlobales } from '../variablesGlobale';


@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
  styleUrls: ['./comic-detail.component.css']
})

export class ComicDetailComponent implements OnInit {
  selectedComic: MarvelComic| undefined;
  characters: Character[] = [];
  creators: Creator[] = [];


  constructor(private route: ActivatedRoute, private http: HttpClient, private Global: VariablesGlobales) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const comicId = params.get('id');
      if (comicId) {
        const comicUrl = this.Global.apiUrl+`/comics/${comicId}?ts=1&apikey=${this.Global.apiKey}&hash=${this.Global.hash}`;
        const charactersUrl = this.Global.apiUrl+`/comics/${comicId}/characters?ts=1&apikey=${this.Global.apiKey}&hash=${this.Global.hash}`;
        const creatorsUrl = this.Global.apiUrl+`/comics/${comicId}/creators?ts=1&apikey=${this.Global.apiKey}&hash=${this.Global.hash}`;
       

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
