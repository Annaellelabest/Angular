import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MarvelDataService } from '../data.services'; 
import { MarvelData } from '../MarvelData';
import { MarvelCharacter } from '../MarvelCharacter';

@Component({
  selector: 'app-marvel',
  templateUrl: './marvel.component.html',
  styleUrls: ['./marvel.component.css']
})

export class MarvelComponent implements OnInit {
  // Paramètres de pagination
  pageSize: number = 24;
  currentPage: number = 1;
  totalPages: number = 1;

   // Données des cartes
  allCharacters: MarvelCharacter[] = [];
  filteredCharacters: MarvelCharacter[] = [];
  marvelData: MarvelData | undefined;

   // Formulaire de recherche
  searchForm: FormGroup;
  searchCtrl: FormControl<string>;
  lastSearchValue: string = '';

  constructor( private formBuilder: FormBuilder, private dataService: MarvelDataService) {
    this.searchCtrl = new FormControl('', { validators: [Validators.required], nonNullable: true });
    this.searchForm = this.formBuilder.group({
      search: this.searchCtrl,
    });
  }

  ngOnInit(): void {
    // Récupération des données Marvel au chargement de la page
    this.dataService.getMarvelData().subscribe(data => {
      this.marvelData = data;
      this.allCharacters = data.data.results;
      this.totalPages = Math.ceil(data.data.total / this.pageSize);
      this.updateFilteredCharacters();
    });

    this.searchCtrl.valueChanges
      .pipe(
        startWith(''), 
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => this.searchMarvelCharacters(value))
      )
      .subscribe((data: MarvelData) => {
        if (data) {
          // Mise à jour des personnages avec les résultats de la recherche
          this.allCharacters = data.data.results;
          this.totalPages = Math.ceil(data.data.total / this.pageSize);
          this.currentPage = 1;
          this.updateFilteredCharacters();
        } else {
          this.filteredCharacters = [];
        }
      });
  }

  // Recherche des personnages Marvel par nom
  searchMarvelCharacters(searchValue: string): Observable<MarvelData> {
    return this.dataService.searchMarvelByName(searchValue);
  }

   // Gestion des changements dans le champ de recherche
  onSearchChange() {
    const searchValue = this.searchCtrl.value;
    this.lastSearchValue = searchValue; 
    if (searchValue) {
      // Effectuer une recherche si un terme est saisi
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
// Met à jour la liste des personnages affichés en fonction de la pagination
  updateFilteredCharacters() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredCharacters = this.allCharacters.slice(startIndex, endIndex);
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

  // Récupérer de nouvelles données et mettre à jour les personnages
  getMarvelDataAndUpdate() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.dataService.getMarvelData(startIndex, endIndex, this.lastSearchValue).subscribe(
      (data) => {
        this.marvelData = data;
        this.allCharacters = data.data.results;
        this.totalPages = Math.ceil(data.data.total / this.pageSize);
        this.filteredCharacters = this.allCharacters;
      },
      (error) => {
        console.error('Error fetching Marvel characters:', error);
      }
    );
  }


}
