import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarvelComic } from '../MarvelComic';
import { Character } from '../Character';
import { Creator } from '../Creator';
import { MarvelDetailServices } from '../detail.services';

@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
  styleUrls: ['./comic-detail.component.css']
})

export class ComicDetailComponent implements OnInit {
  selectedComic: MarvelComic| undefined;
  characters: Character[] = [];
  creators: Creator[] = [];


  constructor(private router:Router ,private route: ActivatedRoute, private marvelDetailServices: MarvelDetailServices) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const comicId = params.get('id');
      if (comicId) {
           // Récupération des détails du comic
        this.marvelDetailServices.getDetails('comics',comicId).subscribe(
          (comicResponse: any) => {
            this.selectedComic = comicResponse.data.results[0];
          },
          (error) => {
            console.error('Error fetching comic details:', error);
          }
        );
// Récupération des personnages liés au comic
        this.marvelDetailServices.getRelated('comics',comicId, 'characters').subscribe(
          (charactersResponse: any) => {
            this.characters = charactersResponse.data.results;
          },
          (error) => {
            console.error('Error fetching characters:', error);
          }
        );

        // Récupération des créateurs liés au comic
        this.marvelDetailServices.getRelated('comics',comicId, 'creators').subscribe(
          (creatorsResponse: any) => {
            this.creators = creatorsResponse.data.results;
          },
          (error) => {
            console.error('Error fetching creators:', error);
          }
        );
      }
    });
  }
// Récupération de l'URL de l'image du comic
  getThumbnailUrl(comic: MarvelComic): string {
    return `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
  }
// Retour à la page comics
  goBack() {
    this.router.navigate(['/page']);
  }
}
