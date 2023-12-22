import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VariablesGlobales } from './variablesGlobale';

@Injectable({
  providedIn: 'root',
})
export class MarvelDetailServices {
  constructor(private http: HttpClient, private global: VariablesGlobales) {}

  //Ces fonctions permet de creer la bonne url pour appélé l'api en focntion des parametres 
  //(entity = (savoir si on est sur une page characters/comis..), entityId = (Id de la "carte" ), relatedEntity = (appel le bon "ongle" pour afficher les infos lié a la "carte" ))

  getDetails(entity: string, entityId: string): Observable<any> {
    const url = `${this.global.apiUrl}/${entity}/${entityId}?ts=1&apikey=${this.global.apiKey}&hash=${this.global.hash}`;
    return this.http.get(url);
  }

  getRelated(entity: string, entityId: string, relatedEntity: string): Observable<any> {
    const url = `${this.global.apiUrl}/${entity}/${entityId}/${relatedEntity}?ts=1&apikey=${this.global.apiKey}&hash=${this.global.hash}`;
    return this.http.get(url);
  }
}