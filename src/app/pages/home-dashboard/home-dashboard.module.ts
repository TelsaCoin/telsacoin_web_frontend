import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeDashboardRoutingModule } from './home-dashboard-routing.module';
import { HomeComponent } from './components/home/home.component';
import { PodcastCardComponent } from './components/podcast-card/podcast-card.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { EpisodeDetailsComponent } from './components/episode-details/episode-details.component';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { PlayerComponent } from 'src/app/components/player/player.component';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentComponent } from 'src/app/components/comment/comment.component';
import { CommentBoxComponent } from 'src/app/components/comment-box/comment-box.component';
import { DateAgoPipe } from 'src/app/pipes/date-ago.pipe';
import { ImagePreloadDirective } from 'src/app/directives/image-preload.directive';
import { MatChipsModule } from '@angular/material/chips';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';

import { environment } from 'src/environments/environment';
// const config = {"apiKey": "AIzaSyBNUliZKR_sIwIbBruXqRM8rkOmMEMYeKY", "clientId":"206317282199-s7jlkicorlusser9n9hu53mh3o6g148s.apps.googleusercontent.com","projectId":"aureal-3a2b1","authDomain": "https://app.aureal.one", "auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"5GRyaqPkSiokeaNDxHl5iN_R","redirect_uris":["https://app.aureal.one", "http://localhost:4201"],"javascript_origins":["http://localhost","http://localhost:4201","https://app.aureal.one"]}

@NgModule({
  declarations: [HomeComponent, PodcastCardComponent, EpisodeDetailsComponent, CommentComponent, CommentBoxComponent, DateAgoPipe, ImagePreloadDirective],
  imports: [
    CommonModule,
    HomeDashboardRoutingModule,
    InfiniteScrollModule,
    MatDialogModule,
    NgxAudioPlayerModule,
    MatToolbarModule,
    MatIconModule,
    MatSliderModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    ShareButtonsModule.withConfig({
      debug: true
    }),
    ShareIconsModule,
  ],
  exports: [CommentComponent, CommentBoxComponent, DateAgoPipe, PodcastCardComponent, ImagePreloadDirective, MatChipsModule, ShareButtonsModule],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} }
  ]
})
export class HomeDashboardModule { }
