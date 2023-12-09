// File name: marvel.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; // Make sure to include this import

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
  name: string;
  description: string;
}

@Component({
  selector: 'app-marvel',
  templateUrl: './marvel.component.html',
  styleUrls: ['./marvel.component.css']
})

export class MarvelComponent implements OnInit {


  filteredCharacters: MarvelCharacter[] = [];
  marvelData: MarvelData | undefined;
  private apiUrl = 'http://gateway.marvel.com/v1/public/characters';
  private apiKey = 'eff0bf634828b9b11ad00a5c23f96be3';
  allCharacters: MarvelCharacter[] = [];
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
        this.allCharacters = data.data.results;
        this.filteredCharacters = this.allCharacters;
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
          this.filteredCharacters = data.data.results;
        } else {
          this.filteredCharacters = [];
        }
      });
  }



  getMarvelData(url?: string): Observable<MarvelData> {
    if (url) {
      return this.http.get<MarvelData>(url);
    }

    const apiUrl = `${this.apiUrl}?ts=1&apikey=${this.apiKey}&hash=6243916182e91659aa5ee22aef120b20`;
    return this.http.get<MarvelData>(apiUrl);
  }

  searchMarvelByName(name: string): Observable<MarvelData> {
    const url = `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=${this.apiKey}&hash=6243916182e91659aa5ee22aef120b20&nameStartsWith=${name}`;
    return this.getMarvelData(url);
  }

  searchMarvelCharacters(searchValue: string): Observable<MarvelData> {
    return this.searchMarvelByName(searchValue);
  }

  onSearchChange() {
    const searchValue = this.searchCtrl.value;
    if (searchValue) {
      this.searchMarvelCharacters(searchValue).subscribe((data: MarvelData) => {
        this.filteredCharacters = data.data.results;
      });
    } else {
      this.filteredCharacters = this.allCharacters;
    }
  }
}
