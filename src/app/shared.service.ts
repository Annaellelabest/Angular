// shared.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MarvelData } from './MarvelData';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private marvelDataSubject = new BehaviorSubject<MarvelData | undefined>(undefined);
  marvelData$ = this.marvelDataSubject.asObservable();

  updateMarvelData(data: MarvelData | undefined) {
    this.marvelDataSubject.next(data);
  }
}
