import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VariablesGlobales } from './variablesGlobale';

@Injectable({
  providedIn: 'root',
})
export class MarvelDetailServices {
  constructor(private http: HttpClient, private global: VariablesGlobales) {}

  getDetails(entity: string, entityId: string): Observable<any> {
    const url = `${this.global.apiUrl}/${entity}/${entityId}?ts=1&apikey=${this.global.apiKey}&hash=${this.global.hash}`;
    return this.http.get(url);
  }

  getRelated(entity: string, entityId: string, relatedEntity: string): Observable<any> {
    const url = `${this.global.apiUrl}/${entity}/${entityId}/${relatedEntity}?ts=1&apikey=${this.global.apiKey}&hash=${this.global.hash}`;
    return this.http.get(url);
  }
}