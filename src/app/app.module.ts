// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MarvelComponent } from './marvel/marvel.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { CharactersComponent } from './characters/characters.component';
import { ComicComponent } from './comic/comic.component';
import { PageComponent } from './page/page.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MarvelComponent,
    CharactersComponent,
    ComicComponent,
    PageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [MarvelComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
