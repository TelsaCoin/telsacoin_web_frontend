import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeDashboardRoutingModule } from './home-dashboard-routing.module';
import { HomeComponent } from './components/home/home.component';
import { EpisodeDetailsComponent } from './components/episode-details/episode-details.component';

import { SharedModule } from 'src/app/modules/shared/shared.module';
import { HomeDashboardComponent } from './home-dashboard.component';


@NgModule({
  declarations: [
    HomeComponent,
    EpisodeDetailsComponent, 
    CommentComponent, 
    CommentBoxComponent, 
    HomeDashboardComponent, 
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeDashboardRoutingModule,
  ],
  exports: [
    CommentComponent, 
    CommentBoxComponent, 
  ],
  bootstrap: [HomeDashboardComponent],
})
export class HomeDashboardModule { }
