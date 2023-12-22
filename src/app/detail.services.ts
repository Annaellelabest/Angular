import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VariablesGlobales } from './variablesGlobale';

@Injectable({
  providedIn: 'root',
})
export class MarvelDetailServices {
  constructor(private http: HttpClient, private global: VariablesGlobales) {}

  //Ces fonctions permettent de creer la bonne url pour appeler l'api en fonction des parametres 
  //(entity = (savoir si on est sur une page characters/comics..), entityId = (Id de la "carte" ), relatedEntity = (appel le bon "onglet" pour afficher les infos liées a la "carte" ))

  getDetails(entity: string, entityId: string): Observable<any> {
    const url = `${this.global.apiUrl}/${entity}/${entityId}?ts=1&apikey=${this.global.apiKey}&hash=${this.global.hash}`;
    return this.http.get(url);
  }

  getRelated(entity: string, entityId: string, relatedEntity: string): Observable<any> {
    const url = `${this.global.apiUrl}/${entity}/${entityId}/${relatedEntity}?ts=1&apikey=${this.global.apiKey}&hash=${this.global.hash}`;
    return this.http.get(url);
  }
}