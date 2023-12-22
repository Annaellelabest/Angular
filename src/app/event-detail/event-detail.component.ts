import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarvelEvent } from '../MarvelEvent';
import { Character } from '../Character';
import { Comic } from '../Comic';
import { Creator } from '../Creator';
import { MarvelDetailServices } from '../detail.services';


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

  constructor(private router: Router,private route: ActivatedRoute, private marvelDetailServices: MarvelDetailServices) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const eventId = params.get('id');
      if (eventId) {
        // Récupération des détails de l'événement
        this.marvelDetailServices.getDetails('events',eventId).subscribe(
          (eventResponse: any) => {
            this.selectedEvent = eventResponse.data.results[0];
          },
          (error) => {
            console.error('Error fetching event details:', error);
          }
        );
// Récupération des personnages liés à l'événement
        this.marvelDetailServices.getRelated('events',eventId, 'characters').subscribe(
          (charactersResponse: any) => {
            this.characters = charactersResponse.data.results;
          },
          (error) => {
            console.error('Error fetching characters:', error);
          }
        );
// Récupération des comics liés à l'événement
        this.marvelDetailServices.getRelated('events',eventId, 'comics').subscribe(
          (comicsResponse: any) => {
            this.comics = comicsResponse.data.results;
          },
          (error) => {
            console.error('Error fetching comics:', error);
          }
        );
// Récupération des créateurs liés à l'événement
        this.marvelDetailServices.getRelated('events',eventId, 'creators').subscribe(
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


  getThumbnailUrl(comic: MarvelEvent): string {
    return `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
  }
  goBack() {
    this.router.navigate(['/events']);
  }

  
}
