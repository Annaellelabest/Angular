import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MarvelData } from './MarvelData';
import { VariablesGlobales } from './variablesGlobale';

@Injectable({
  providedIn: 'root',
})
export class MarvelDataService {
  constructor(private http: HttpClient, private global: VariablesGlobales) {}

  // Creer la bonne url pour appeler l'api en fonction des parametres
  private getMarvelDataByType(
    resourceType: string,
    startIndex: number = 0,
    endIndex: number = 24,
    searchValue: string = ''
  ): Observable<MarvelData> {
    let params = new HttpParams()
      .set('ts', '1')
      .set('apikey', this.global.apiKey)
      .set('hash', this.global.hash)
      .set('offset', startIndex.toString())
      .set('limit', (endIndex - startIndex).toString());

     //Pour la fonction de "filtre" par nom ou titre, url est modifiée en fonction de la page sur laquelle on est
      if (searchValue) {
        if (resourceType === 'characters' || resourceType === 'events') {
          params = params.set('nameStartsWith', searchValue);
        } else if (resourceType === 'comics' || resourceType === 'series') {
          params = params.set('titleStartsWith', searchValue);
        }
      }
  
    return this.http.get<MarvelData>(`${this.global.apiUrl}/${resourceType}`, { params });
  }

  //differentes fonctions pour appeler l'api en fonction de la page sur laquelle on est
  //differentes fonctions pour la recherche par nom ou titre

  getMarvelData(startIndex: number = 0, endIndex: number = 24, searchValue: string = ''): Observable<MarvelData> {
    return this.getMarvelDataByType('characters', startIndex, endIndex, searchValue);
  }

  searchMarvelByName(name: string): Observable<MarvelData> {
    return this.getMarvelDataByType('characters', 0, 24, name);
  }

  getMarvelDataComic(startIndex: number = 0, endIndex: number = 24, searchValue: string = ''): Observable<MarvelData> {
    return this.getMarvelDataByType('comics', startIndex, endIndex, searchValue);
  }

  searchMarvelByTitleComic(title: string): Observable<MarvelData> {
    return this.getMarvelDataByType('comics', 0, 24, title);
  }

  getMarvelDataEvent(startIndex: number = 0, endIndex: number = 24, searchValue: string = ''): Observable<MarvelData> {
    return this.getMarvelDataByType('events', startIndex, endIndex, searchValue);
  }

  searchMarvelByNameEvent(name: string): Observable<MarvelData> {
    return this.getMarvelDataByType('events', 0, 24, name);
  }

  getMarvelDataSeries(startIndex: number = 0, endIndex: number = 24, searchValue: string = ''): Observable<MarvelData> {
    return this.getMarvelDataByType('series', startIndex, endIndex, searchValue);
  }

  searchMarvelByNameSeries(name: string): Observable<MarvelData> {
    return this.getMarvelDataByType('series', 0, 24, name);
  }
}
