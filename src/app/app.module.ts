import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MarvelComponent } from './character-page/marvel.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './header/navbar.component';
import { CharactersComponent } from './characters/characters.component';
import { ComicComponent } from './comic/comic.component';
import { PageComponent } from './comic-page/page.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { ComicDetailComponent } from './comic-detail/comic-detail.component';
import { AboutComponent } from './about/about.component';
import { CreatorPageComponent } from './creator-page/creator-page.component';
import { CreatorComponent } from './creator/creator.component';
import { EventComponent } from './event/event.component';
import { EventPageComponent } from './event-page/event-page.component';
import { SeriesPageComponent } from './series-page/series-page.component';
import { SeriesComponent } from './series/series.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { SeriesDetailComponent } from './series-detail/series-detail.component';
import { CreatorDetailComponent } from './creator-detail/creator-detail.component';
import { BackgroundComponent } from './background/background.component';
import { FooterComponent } from './footer/footer.component';


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
    SeriesComponent,
    EventDetailComponent,
    SeriesDetailComponent,
    CreatorDetailComponent,
    BackgroundComponent,
    FooterComponent
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
