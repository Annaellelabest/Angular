import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

//Cette classe est utilisée pour stocker les variables globales de l'application 
//(la clé api, le hash et l'url de l'api)

  export class VariablesGlobales {
    apiUrl = 'http://gateway.marvel.com/v1/public';
    apiKey = 'eff0bf634828b9b11ad00a5c23f96be3';
    hash='6243916182e91659aa5ee22aef120b20';

  }