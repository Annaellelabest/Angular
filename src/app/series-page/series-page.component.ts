import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MarvelCharacter } from '../MarvelCharacter';
import { MarvelData } from '../MarvelData';
import { MarvelDataService } from '../data.services';


@Component({
  selector: 'app-series-page',
  templateUrl: './series-page.component.html',
  styleUrls: ['./series-page.component.css']
})
export class SeriesPageComponent {
  // paramètres de pagination
  pageSize: number = 24;
  currentPage: number = 1;
  totalPages: number = 1;

  // Données des cartes
  filteredTitle: MarvelCharacter[] = [];
  marvelData: MarvelData | undefined;
  allTitle: MarvelCharacter[] = [];

  // Formulaire de recherche
  searchForm: FormGroup;
  searchCtrl: FormControl<string>;
  lastSearchValue: string = '';

  constructor( private formBuilder: FormBuilder,private dataService: MarvelDataService) {
    this.searchCtrl = new FormControl('', { validators: [Validators.required], nonNullable: true });
    this.searchForm = this.formBuilder.group({
      search: this.searchCtrl,
    });
  }

  ngOnInit(): void {
    // Récupération des données Marvel au chargement de la page
    this.dataService.getMarvelDataSeries().subscribe(
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
          // Mise à jour des series avec les résultats de la recherche
          this.filteredTitle = data.data.results;
        } else {
          this.filteredTitle = [];
        }
      });
  }
  
// Récupération de l'URL de l'image du series
  searchMarvelCharacters(searchValue: string): Observable<MarvelData> {
    return this.dataService.searchMarvelByNameSeries(searchValue);
  }

  // Récupération de l'URL de l'image du series
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
      this.dataService.getMarvelDataSeries().subscribe((data: MarvelData) => {
        this.allTitle = data.data.results;
        this.totalPages = Math.ceil(data.data.total / this.pageSize);
        this.currentPage = 1;
        this.updateFilteredCharacters();
      });
    }
  }
 
  // Met à jour la liste des series affichés en fonction de la pagination
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

  // Récupérer de nouvelles données et mettre à jour les series
  getMarvelDataAndUpdate() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
  
    this.dataService.getMarvelDataSeries(startIndex, endIndex, this.lastSearchValue).subscribe(
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
