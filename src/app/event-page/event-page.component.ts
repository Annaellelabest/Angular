import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface MarvelData {
  attributionHTML: string;
  data: {
    results: MarvelCharacter[];
  };
}

export interface MarvelCharacter {
  thumbnail: {
    path: string;
    extension: string;
  };
  urls: {
    url: string;
  }[];
  title: string;
  description: string;
}

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent implements OnInit {

  filteredTitle: MarvelCharacter[] = [];
  marvelData: MarvelData | undefined;
  private apiUrl = 'http://gateway.marvel.com/v1/public/events';
  private apiKey = 'eff0bf634828b9b11ad00a5c23f96be3';
  allTitle: MarvelCharacter[] = [];
  searchForm: FormGroup;
  searchCtrl: FormControl<string>;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.searchCtrl = new FormControl('', { validators: [Validators.required], nonNullable: true });
    this.searchForm = this.formBuilder.group({
      search: this.searchCtrl,
    });
  }

  ngOnInit(): void {
    this.getMarvelData().subscribe(
      (data => {
        this.marvelData = data;
        this.allTitle = data.data.results;
        this.filteredTitle = this.allTitle;
      })
    );

    // Subscribe to changes in the search input
    this.searchCtrl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => this.searchMarvelCharacters(value))
      )
      .subscribe((data: MarvelData) => {
        if (data) {
          this.filteredTitle = data.data.results;
        } else {
          this.filteredTitle = [];
        }
      });
  }

  getMarvelData(url?: string, limit: number = 72): Observable<MarvelData> {
    if (url) {
      return this.http.get<MarvelData>(url);
    }

    const apiUrl = `${this.apiUrl}?ts=1&apikey=${this.apiKey}&hash=6243916182e91659aa5ee22aef120b20&limit=${limit}`;
    return this.http.get<MarvelData>(apiUrl);
  }

  searchMarvelByName(title: string): Observable<MarvelData> {
    const url = `https://gateway.marvel.com/v1/public/events?ts=1&apikey=${this.apiKey}&hash=6243916182e91659aa5ee22aef120b20&titleStartsWith=${title}`;
    return this.getMarvelData(url);
  }

  searchMarvelCharacters(searchValue: string): Observable<MarvelData> {
    return this.searchMarvelByName(searchValue);
  }

  onSearchChange() {
    const searchValue = this.searchCtrl.value;
    if (searchValue) {
      this.searchMarvelCharacters(searchValue).subscribe((data: MarvelData) => {
        this.filteredTitle = data.data.results;
      });
    } else {
      this.filteredTitle = this.filteredTitle;
    }
  }
}
