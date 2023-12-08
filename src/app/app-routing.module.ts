import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarvelComponent } from './marvel/marvel.component';
import { PageComponent } from './page/page.component'; // You need to create ComicsComponent

const routes: Routes = [
  { path: 'marvel', component: MarvelComponent },
  { path: 'page', component: PageComponent },
];
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
