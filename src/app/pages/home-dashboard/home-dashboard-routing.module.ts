import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EpisodeDetailsComponent } from 'src/app/pages/home-dashboard/components/episode-details/episode-details.component';
import { DiscoverComponent } from './pages/discover/discover.component';
import { FavoriteComponent } from './pages/favorite/favorite.component';
import { HomeDashboardComponent } from './home-dashboard.component';

const routes: Routes = [
  {
    path: '', component: HomeDashboardComponent,
    children: [
      { path: '', component: DiscoverComponent },
      { path: 'favorite', component: FavoriteComponent },
      // { path: '', component: HomeComponent },
      { path: 'episode/:episode_id', component: EpisodeDetailsComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeDashboardRoutingModule { }
