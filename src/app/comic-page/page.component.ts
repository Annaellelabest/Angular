import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MarvelData } from '../MarvelData';
import { MarvelCharacter } from '../MarvelCharacter';
import { MarvelDataService } from '../data.services'; 



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
  allTitle: MarvelCharacter[] = [];
  searchForm: FormGroup;
  searchCtrl: FormControl<string>;
  lastSearchValue: string = '';

  constructor( private formBuilder: FormBuilder,  private dataService: MarvelDataService) {
    this.searchCtrl = new FormControl('', { validators: [Validators.required], nonNullable: true });
    this.searchForm = this.formBuilder.group({
      search: this.searchCtrl,
    });
  }

  ngOnInit(): void {
    this.dataService.getMarvelDataComic().subscribe(
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



  searchMarvelCharacters(searchValue: string): Observable<MarvelData> {
    return this.dataService.searchMarvelByTitleComic(searchValue);
  }


  onSearchChange() {
    const searchValue = this.searchCtrl.value;
    this.lastSearchValue = searchValue;
  
    if (searchValue) {
      this.searchMarvelCharacters(searchValue).subscribe((data: MarvelData) => {
        this.allTitle = data.data.results;
        this.totalPages = Math.ceil(data.data.total / this.pageSize);
        this.currentPage = 1; 
        this.updateFilteredCharacters();
      });
    } else {
      this.dataService.getMarvelDataComic().subscribe((data: MarvelData) => {
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
  
    this.dataService.getMarvelDataComic(startIndex, endIndex, this.lastSearchValue).subscribe(
      data => {
        this.marvelData = data;
        const newResults = data.data.results;
        
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
