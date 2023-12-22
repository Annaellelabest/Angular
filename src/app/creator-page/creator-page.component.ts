import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { MarvelCharacter } from '../MarvelCharacter';
import { MarvelData } from '../MarvelData';


@Component({
  selector: 'app-creator-page',
  templateUrl: './creator-page.component.html',
  styleUrls: ['./creator-page.component.css']
})
export class CreatorPageComponent {

  filteredName: MarvelCharacter[] = [];
  marvelData: MarvelData | undefined;
  private apiUrl = 'http://gateway.marvel.com/v1/public/creators';
  private apiKey = 'eff0bf634828b9b11ad00a5c23f96be3';
  allName: MarvelCharacter[] = [];
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
        this.allName = data.data.results;
        this.filteredName = this.allName;
      })
    );

    this.searchCtrl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => this.searchMarvelCharacters(value))
      )
      .subscribe((data: MarvelData) => {
        if (data) {
          this.filteredName = data.data.results;
        } else {
          this.filteredName = [];
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
    const url = `https://gateway.marvel.com/v1/public/creators?ts=1&apikey=${this.apiKey}&hash=6243916182e91659aa5ee22aef120b20&nameStartsWith=${name}`;
    return this.getMarvelData(url);
  }

  searchMarvelCharacters(searchValue: string): Observable<MarvelData> {
    return this.searchMarvelByName(searchValue);
  }

  onSearchChange() {
    const searchValue = this.searchCtrl.value;
    if (searchValue) {
      this.searchMarvelCharacters(searchValue).subscribe((data: MarvelData) => {
        this.filteredName = data.data.results;
      });
    } else {
      this.filteredName = this.filteredName;
    }
  }
}
