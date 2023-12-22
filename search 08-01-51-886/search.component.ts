import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MarvelData } from '../MarvelData';
import { MarvelCharacter } from '../MarvelCharacter';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{

  pageSize: number = 24;
  currentPage: number = 1;
  totalPages: number = 1;
  searchForm: FormGroup;
  searchCtrl: FormControl<string>;

  allCharacters: MarvelCharacter[] = [];
  filteredCharacters: MarvelCharacter[] = [];
  @Input() marvelData: MarvelData | undefined;
  private apiUrl = 'http://gateway.marvel.com/v1/public/characters';
  private apiKey = 'eff0bf634828b9b11ad00a5c23f96be3';
 

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.searchCtrl = new FormControl('', { validators: [Validators.required], nonNullable: true });
    this.searchForm = this.formBuilder.group({
      search: this.searchCtrl,
    });
  }

  ngOnInit(): void {
    this.getMarvelData().subscribe(data => {
      this.marvelData = data;
      this.allCharacters = data.data.results;
      this.totalPages = Math.ceil(data.data.total / this.pageSize);
      this.updateFilteredCharacters();
    });
  
    this.searchCtrl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => this.searchMarvelCharacters(value))
      )
      .subscribe((data: MarvelData) => {
        if (data) {
          this.allCharacters = data.data.results;
          this.totalPages = Math.ceil(data.data.total / this.pageSize);
          this.currentPage = 1;
          this.updateFilteredCharacters();
        } else {
          this.filteredCharacters = [];
        }
      });
  }
  
  searchMarvelCharacters(searchValue: string): Observable<MarvelData> {
    return this.searchMarvelByName(searchValue);
  }
  searchMarvelByName(name: string): Observable<MarvelData> {
    const params = new HttpParams()
      .set('ts', '1')
      .set('apikey', this.apiKey)
      .set('hash', '6243916182e91659aa5ee22aef120b20')
      .set('nameStartsWith', name);

    return this.http.get<MarvelData>(this.apiUrl, { params });
  }
  updateFilteredCharacters() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredCharacters = this.allCharacters.slice(startIndex, endIndex);
  }
   
  getMarvelData(startIndex: number = 0, endIndex: number = this.pageSize): Observable<MarvelData> {
    const params = new HttpParams()
      .set('ts', '1')
      .set('apikey', this.apiKey)
      .set('hash', '6243916182e91659aa5ee22aef120b20')
      .set('offset', startIndex.toString())
      .set('limit', (endIndex - startIndex).toString());

    return this.http.get<MarvelData>(this.apiUrl, { params });
  }

  onSearchChange() {
    const searchValue = this.searchCtrl.value;
    if (searchValue) {
      this.searchMarvelCharacters(searchValue).subscribe((data: MarvelData) => {
        this.allCharacters = data.data.results;
        this.totalPages = Math.ceil(data.data.total / this.pageSize);
        this.currentPage = 1;
        this.updateFilteredCharacters();
      });
    } else {
      this.filteredCharacters = this.allCharacters.slice(0, this.pageSize);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getMarvelDataAndUpdate();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getMarvelDataAndUpdate();
    }
  }

  getMarvelDataAndUpdate() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.getMarvelData(startIndex, endIndex).subscribe(
      data => {
        this.marvelData = data;
        this.allCharacters = data.data.results;
        this.totalPages = Math.ceil(data.data.total / this.pageSize);
        this.filteredCharacters = this.allCharacters;
      },
      error => {
        console.error('Error fetching Marvel characters:', error);
      }
    );
  }


}
