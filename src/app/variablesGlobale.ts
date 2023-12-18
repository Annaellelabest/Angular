import { Injectable } from '@angular/core';
import { MarvelCharacter } from './MarvelCharacter';
import { MarvelData } from './MarvelData';
import { Comic } from './Comic';
import { Series } from './Series';

@Injectable({
    providedIn: 'root'
  })

  export class VariablesGlobales {

    apiUrl = 'http://gateway.marvel.com/v1/public/';
    apiKey = 'eff0bf634828b9b11ad00a5c23f96be3';

  }