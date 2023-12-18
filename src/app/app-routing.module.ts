import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarvelComponent } from './character-page/marvel.component';
import { PageComponent } from './comic-page/page.component'; 
import { CharacterDetailComponent } from './character-detail/character-detail.component'; 
import { ComicDetailComponent } from './comic-detail/comic-detail.component';
import { AboutComponent } from './about/about.component';
import { CreatorPageComponent } from './creator-page/creator-page.component';
import { EventPageComponent } from './event-page/event-page.component';
import { SeriesPageComponent } from './series-page/series-page.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { SeriesDetailComponent } from './series-detail/series-detail.component';
import { CreatorDetailComponent } from './creator-detail/creator-detail.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/marvel' },
  { path: 'marvel', component: MarvelComponent },
  { path: 'page', component: PageComponent },
  { path: 'detail/:id', component: CharacterDetailComponent },
  { path: 'comic-detail/:id', component: ComicDetailComponent },
  { path: 'event-detail/:id', component: EventDetailComponent },
  { path: 'series-detail/:id', component: SeriesDetailComponent },
  { path: 'creator-detail/:id', component: CreatorDetailComponent },
  { path: 'creators', component: CreatorPageComponent },
  { path: 'events', component: EventPageComponent },
  { path: 'page', component: PageComponent },
  { path: 'series', component: SeriesPageComponent},
  { path: 'about', component: AboutComponent }

];
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
