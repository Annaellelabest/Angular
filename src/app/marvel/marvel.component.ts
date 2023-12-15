import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface MarvelData {
  attributionHTML: string;
  data: {
    results: MarvelCharacter[];
    total: number;
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
  alphabet: string[] = Array.from({ length: 26 }, (_, i) => String.fromCharCode('A'.charCodeAt(0) + i));
  allCharacters: MarvelCharacter[] = [];
  filteredCharacters: MarvelCharacter[] = [];
  marvelData: MarvelData | undefined;
  private apiUrl = 'http://gateway.marvel.com/v1/public/characters';
  private apiKey = 'eff0bf634828b9b11ad00a5c23f96be3';
  searchForm: FormGroup;
  searchCtrl: FormControl<string>;
  currentPage: number = 1;
  charactersPerPage: number = 72;
  totalPages: number = 1;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private zone: NgZone) {
    this.searchCtrl = new FormControl('', { validators: [Validators.required], nonNullable: true });
    this.searchForm = this.formBuilder.group({
      search: this.searchCtrl,
    });
  }

  ngOnInit(): void {
    this.getMarvelData().subscribe((data => {
      this.marvelData = data;
      this.allCharacters = data.data.results;
      this.updateTotalPages();
      this.updateFilteredCharacters();
    }));

    this.searchCtrl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => this.searchMarvelCharacters(value))
      )
      .subscribe((data: MarvelData) => {
        if (data) {
          this.allCharacters = data.data.results;
          this.updateTotalPages();
          this.updateFilteredCharacters();
        } else {
          this.filteredCharacters = [];
        }
      });
  }

  getMarvelData(url?: string): Observable<MarvelData> {
    const limit = this.charactersPerPage;
    const offset = (this.currentPage - 1) * this.charactersPerPage;

    let apiUrl = `${this.apiUrl}?ts=1&apikey=${this.apiKey}&hash=6243916182e91659aa5ee22aef120b20&limit=${limit}&offset=${offset}`;

    // Ajoute la logique pour le filtre par lettre
    const searchLetter = this.searchCtrl.value;
    if (searchLetter) {
      apiUrl += `&nameStartsWith=${searchLetter}`;
    }

    return this.http.get<MarvelData>(apiUrl);
  }

  searchMarvelByName(name: string): Observable<MarvelData> {
    const offset = (this.currentPage - 1) * this.charactersPerPage;
    const limit = this.charactersPerPage;
    const url = `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=${this.apiKey}&hash=6243916182e91659aa5ee22aef120b20&limit=${limit}&offset=${offset}&nameStartsWith=${name}`;
    return this.getMarvelData(url);
  }

  searchMarvelCharacters(searchValue: string): Observable<MarvelData> {
    const limit = this.charactersPerPage;
    const offset = (this.currentPage - 1) * this.charactersPerPage;
    
    const url = `${this.apiUrl}?ts=1&apikey=${this.apiKey}&hash=6243916182e91659aa5ee22aef120b20&limit=${limit}&offset=${offset}&nameStartsWith=${searchValue}`;
    
    return this.http.get<MarvelData>(url);
  }
  

  updateFilteredCharacters() {
    const startIdx = (this.currentPage - 1) * this.charactersPerPage;
    const endIdx = startIdx + this.charactersPerPage;
    this.filteredCharacters = this.allCharacters.slice(startIdx, endIdx);
    console.log('Filtered Characters:', this.filteredCharacters);
  }
  


  updateTotalPages() {
    this.totalPages = Math.ceil((this.marvelData?.data?.total || 0) / this.charactersPerPage) || 1;
  }

  onSearchChange() {
    const searchLetter = this.searchCtrl.value;
    if (searchLetter) {
      this.searchMarvelCharacters(searchLetter).subscribe((data: MarvelData) => {
        this.allCharacters = data.data.results;
        this.updateTotalPages();
        this.updateFilteredCharacters();
      });
    } else {
      this.getMarvelData().subscribe((data: MarvelData) => {
        this.marvelData = data;
        this.allCharacters = data.data.results;
        this.updateTotalPages();
        this.updateFilteredCharacters();
      });
    }
  }
  
  

  onPageChange(page: number) {
    this.zone.run(() => {
      console.log('Clicked on page:', page);
      this.currentPage = page;
      this.updateFilteredCharacters();
    });
  }

  getPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
