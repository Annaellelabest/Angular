import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MarvelComic } from '../MarvelComic';
import { MarvelData } from '../MarvelData';
import { MarvelCharacter } from '../MarvelCharacter';



@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})

export class PageComponent implements OnInit {
  pageSize: number = 24;
  currentPage: number = 1;
  totalPages: number = 1;
  filteredTitle: MarvelCharacter[] = [];
  marvelData: MarvelData | undefined;
  private apiUrl = 'http://gateway.marvel.com/v1/public/comics';
  private apiKey = 'eff0bf634828b9b11ad00a5c23f96be3';
  allTitle: MarvelCharacter[] = [];
  searchForm: FormGroup;
  searchCtrl: FormControl<string>;
  lastSearchValue: string = '';

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.searchCtrl = new FormControl('', { validators: [Validators.required], nonNullable: true });
    this.searchForm = this.formBuilder.group({
      search: this.searchCtrl,
    });
  }

  ngOnInit(): void {
    this.getMarvelData().subscribe(
      data => {
        this.marvelData = data;
        this.allTitle = data.data.results;
        this.totalPages = Math.ceil(data.data.total / this.pageSize);
        this.updateFilteredCharacters();
      },
      error => {
        console.error('Error fetching Marvel characters:', error);
      }
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


  getMarvelData(startIndex: number = 0, endIndex: number = this.pageSize, searchValue: string = ''): Observable<MarvelData> {
    let params = new HttpParams()
      .set('ts', '1')
      .set('apikey', this.apiKey)
      .set('hash', '6243916182e91659aa5ee22aef120b20')
      .set('offset', startIndex.toString())
      .set('limit', (endIndex - startIndex).toString());
  
    if (searchValue) {
      params = params.set('titleStartsWith', searchValue);
    }
  
    return this.http.get<MarvelData>(this.apiUrl, { params });
  }

  searchMarvelByName(name: string): Observable<MarvelData> {
    let params = new HttpParams()
      .set('ts', '1')
      .set('apikey', this.apiKey)
      .set('hash', '6243916182e91659aa5ee22aef120b20')
      .set('titleStartsWith', name)
      .set('limit', this.pageSize.toString());

    return this.http.get<MarvelData>(this.apiUrl, { params });
  }

  searchMarvelCharacters(searchValue: string): Observable<MarvelData> {
    return this.searchMarvelByName(searchValue);
  }


  onSearchChange() {
    const searchValue = this.searchCtrl.value;
    this.lastSearchValue = searchValue;
  
    if (searchValue) {
      this.searchMarvelCharacters(searchValue).subscribe((data: MarvelData) => {
        this.allTitle = data.data.results;
        this.totalPages = Math.ceil(data.data.total / this.pageSize);
        this.currentPage = 1;  // Assurez-vous que la page est réinitialisée à 1
        this.updateFilteredCharacters();
      });
    } else {
      this.getMarvelData().subscribe((data: MarvelData) => {
        this.allTitle = data.data.results;
        this.totalPages = Math.ceil(data.data.total / this.pageSize);
        this.currentPage = 1;
        this.updateFilteredCharacters();
      });
    }
  }
  

  updateFilteredCharacters() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredTitle = this.allTitle.slice(startIndex, endIndex);
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
  
    this.getMarvelData(startIndex, endIndex, this.lastSearchValue).subscribe(
      data => {
        this.marvelData = data;
        const newResults = data.data.results;
        
        // Ajoutez les nouveaux résultats à la liste existante
        this.allTitle = this.allTitle.concat(newResults);
  
        this.totalPages = Math.ceil(data.data.total / this.pageSize);
        this.updateFilteredCharacters();
      },
      error => {
        console.error('Error fetching Marvel characters:', error);
      }
    );
  }
  
}
