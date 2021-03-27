import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EpisodeDetailsComponent } from 'src/app/pages/home-dashboard/components/episode-details/episode-details.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'episode/:episode_id', component: EpisodeDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeDashboardRoutingModule { }
