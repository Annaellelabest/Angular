import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarvelCreator } from '../MarvelCreator';
import { Character } from '../Character';
import { Comic } from '../Comic';
import { MarvelDetailServices } from '../detail.services';


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

  constructor(private router: Router, private route: ActivatedRoute, private marvelDetailServices: MarvelDetailServices) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const creatorId = params.get('id');
      if (creatorId) {
        // Récupération des détails du créateur
        this.marvelDetailServices.getDetails('creators',creatorId).subscribe(
          (creatorResponse: any) => {
            this.selectedCreator = creatorResponse.data.results[0];
          },
          (error) => {
            console.error('Error fetching creator details:', error);
          }
        );
// Récupération des comics liés au créateur
        this.marvelDetailServices.getRelated('creators',creatorId, 'comics').subscribe(
          (comicsResponse: any) => {
            this.comics = comicsResponse.data.results;
          },
          (error) => {
            console.error('Error fetching comics:', error);
          }
        );
// Récupération des events liés au créateur
        this.marvelDetailServices.getRelated('creators',creatorId, 'events').subscribe(
          (eventsResponse: any) => {
            this.events = eventsResponse.data.results;
          },
          (error) => {
            console.error('Error fetching events:', error);
          }
        );
      }
    });
  }

  // Récupération de l'URL de l'image du créateur
  getThumbnailUrl(creator: MarvelCreator): string {
    return `${creator.thumbnail.path}.${creator.thumbnail.extension}`;
  }

  // Retour à la page characters
  goBack() {
    this.router.navigate(['/marvel']);
  }

  
}
