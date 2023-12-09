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
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { ComicDetailComponent } from './comic-detail/comic-detail.component';
import { AboutComponent } from './about/about.component';
import { CreatorPageComponent } from './creator-page/creator-page.component';
import { CreatorComponent } from './creator/creator.component';
import { EventComponent } from './event/event.component';
import { EventPageComponent } from './event-page/event-page.component';
import { SeriesPageComponent } from './series-page/series-page.component';
import { SeriesComponent } from './series/series.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MarvelComponent,
    CharactersComponent,
    ComicComponent,
    PageComponent,
    CharacterDetailComponent,
    ComicDetailComponent,
    AboutComponent,
    CreatorPageComponent,
    CreatorComponent,
    EventComponent,
    EventPageComponent,
    SeriesPageComponent,
    SeriesComponent
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
