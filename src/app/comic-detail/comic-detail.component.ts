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
        this.marvelDetailServices.getDetails('comics',comicId).subscribe(
          (comicResponse: any) => {
            this.selectedComic = comicResponse.data.results[0];
          },
          (error) => {
            console.error('Error fetching comic details:', error);
          }
        );

        this.marvelDetailServices.getRelated('comics',comicId, 'characters').subscribe(
          (charactersResponse: any) => {
            this.characters = charactersResponse.data.results;
          },
          (error) => {
            console.error('Error fetching characters:', error);
          }
        );

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

  getThumbnailUrl(comic: MarvelComic): string {
    return `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
  }

  goBack() {
    this.router.navigate(['/page']);
  }
}
