import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeDashboardRoutingModule } from './home-dashboard-routing.module';
import { HomeComponent } from './components/home/home.component';
import { PodcastCardComponent } from './components/podcast-card/podcast-card.component';
import { EpisodeDetailsComponent } from './components/episode-details/episode-details.component';
import { CommentComponent } from 'src/app/components/comment/comment.component';
import { CommentBoxComponent } from 'src/app/components/comment-box/comment-box.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { DiscoverComponent } from './pages/discover/discover.component';
import { HomeDashboardComponent } from './home-dashboard.component';
import { FavoriteComponent } from './pages/favorite/favorite.component';
import { EpisodeCardComponent } from './components/episode-card/episode-card.component';

@NgModule({
  declarations: [
    HomeComponent,
    PodcastCardComponent, 
    EpisodeDetailsComponent, 
    CommentComponent, 
    CommentBoxComponent, DiscoverComponent, HomeDashboardComponent, FavoriteComponent, EpisodeCardComponent, 
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeDashboardRoutingModule,
  ],
  exports: [
    CommentComponent, 
    CommentBoxComponent, 
    PodcastCardComponent, 
  ],
  bootstrap: [HomeDashboardComponent],
})
export class HomeDashboardModule { }
