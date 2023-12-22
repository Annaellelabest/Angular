import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarvelCharacter } from '../MarvelCharacter';
import { Comic } from '../Comic';
import { Series } from '../Series';
import { MarvelDetailServices } from '../detail.services';




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

  constructor(private router: Router, private route: ActivatedRoute, private marvelDetailServices: MarvelDetailServices) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const characterId = params.get('id');
      if (characterId) {
        // Récupération des détails du personnage
        this.marvelDetailServices.getDetails('characters',characterId).subscribe(
          (characterResponse: any) => {
            this.selectedCharacter = characterResponse.data.results[0];
          },
          (error) => {
            console.error('Error fetching character details:', error);
          }
        );
 // Récupération des comics liés au personnage
        this.marvelDetailServices.getRelated('characters',characterId,'comics').subscribe(
          (comicsResponse: any) => {
            this.comics = comicsResponse.data.results;
          },
          (error) => {
            console.error('Error fetching comics:', error);
          }
        );
 // Récupération des séries liées au personnage
        this.marvelDetailServices.getRelated('characters',characterId,'series').subscribe(
          (seriesResponse: any) => {
            this.series = seriesResponse.data.results;
          },
          (error) => {
            console.error('Error fetching comics:', error);
          }
        );
 // Récupération des événements liés au personnage
        this.marvelDetailServices.getRelated('characters',characterId,'events').subscribe(
          (eventsResponse: any) => {
            this.events = eventsResponse.data.results;
          },
          (error) => {
            console.error('Error fetching comics:', error);
          }
        );
      }
    });


  }

  // Construction de l'URL de l'image du personnage
  getThumbnailUrl(character: MarvelCharacter): string {
    return `${character.thumbnail.path}.${character.thumbnail.extension}`;
  }

 // Retour à la page characters
  goBack() {
    this.router.navigate(['/marvel']);
  }

}
