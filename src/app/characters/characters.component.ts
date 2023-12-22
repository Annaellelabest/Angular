import { Component, Input } from '@angular/core';
import {Router}from '@angular/router';
import { MarvelCharacter } from '../MarvelCharacter';


@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})

export class CharactersComponent {
  constructor(private router: Router) {}
  @Input() character: any | undefined;

  // Récupération de l'URL de la miniature du personnage
  getThumbnailUrl(character: MarvelCharacter): string {
    return `${character.thumbnail.path}.${character.thumbnail.extension}`;
  }
  
}
