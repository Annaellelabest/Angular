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

  getMarvelData(startIndex: number = 0, endIndex: number = 24, searchValue: string = ''): Observable<MarvelData> {
    let params = new HttpParams()
      .set('ts', '1')
      .set('apikey', this.global.apiKey)
      .set('hash', this.global.hash)
      .set('offset', startIndex.toString())
      .set('limit', (endIndex - startIndex).toString());

    if (searchValue) {
      params = params.set('nameStartsWith', searchValue);
    }

    return this.http.get<MarvelData>(`${this.global.apiUrl}/characters`, { params });
  }

  searchMarvelByName(name: string): Observable<MarvelData> {
    let params = new HttpParams()
      .set('ts', '1')
      .set('apikey', this.global.apiKey)
      .set('hash', '6243916182e91659aa5ee22aef120b20')
      .set('nameStartsWith', name)
      .set('limit', '24');

    return this.http.get<MarvelData>(`${this.global.apiUrl}/characters`, { params });
  }

  getMarvelDataComic(startIndex: number = 0, endIndex: number = 24, searchValue: string = ''): Observable<MarvelData> {
    let params = new HttpParams()
      .set('ts', '1')
      .set('apikey', this.global.apiKey)
      .set('hash', this.global.hash)
      .set('offset', startIndex.toString())
      .set('limit', (endIndex - startIndex).toString());

    if (searchValue) {
      params = params.set('titleStartsWith', searchValue);
    }

    return this.http.get<MarvelData>(`${this.global.apiUrl}/comics`, { params });
  }

  searchMarvelByTitleComic(title: string): Observable<MarvelData> {
    let params = new HttpParams()
      .set('ts', '1')
      .set('apikey', this.global.apiKey)
      .set('hash', this.global.hash)
      .set('titleStartsWith', title)
      .set('limit', '24');

    return this.http.get<MarvelData>(`${this.global.apiUrl}/comics`, { params });
  }


  getMarvelDataEvent(startIndex: number = 0, endIndex: number = 24, searchValue: string = ''): Observable<MarvelData> {
    let params = new HttpParams()
      .set('ts', '1')
      .set('apikey', this.global.apiKey)
      .set('hash', this.global.hash)
      .set('offset', startIndex.toString())
      .set('limit', (endIndex - startIndex).toString());
  
    if (searchValue) {
      params = params.set('nameStartsWith', searchValue);
    }
  
    return this.http.get<MarvelData>(this.global.apiUrl+'/events', { params });
  }


  searchMarvelByNameEvent(name: string): Observable<MarvelData> {
    let params = new HttpParams()
      .set('ts', '1')
      .set('apikey', this.global.apiKey)
      .set('hash', this.global.hash)
      .set('nameStartsWith', name)
      .set('limit', '24');

    return this.http.get<MarvelData>(this.global.apiUrl+'/events', { params });
  }

  getMarvelDataSeries(startIndex: number = 0, endIndex: number = 24, searchValue: string = ''): Observable<MarvelData> {
    let params = new HttpParams()
      .set('ts', '1')
      .set('apikey', this.global.apiKey)
      .set('hash', this.global.hash)
      .set('offset', startIndex.toString())
      .set('limit', (endIndex - startIndex).toString());
  
    if (searchValue) {
      params = params.set('titleStartsWith', searchValue);
    }
  
    return this.http.get<MarvelData>(this.global.apiUrl+'/series', { params });
  }
  searchMarvelByNameSeries(name: string): Observable<MarvelData> {
    let params = new HttpParams()
      .set('ts', '1')
      .set('apikey', this.global.apiKey)
      .set('hash', this.global.hash)
      .set('titleStartsWith', name)
      .set('limit', '24');

    return this.http.get<MarvelData>(this.global.apiUrl+'/series', { params });
  }

  
}
