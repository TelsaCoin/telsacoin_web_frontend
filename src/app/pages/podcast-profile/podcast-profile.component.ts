import { Component, OnInit } from '@angular/core';
import { RssFeedDetailsService } from 'src/app/services/rss-feed-details.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';
import * as moment_ from 'moment';
const moment = moment_;
import {CommonService} from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from "@angular/material/dialog";
import { HiveAuthComponent } from 'src/app/components/hive-auth/hive-auth.component';
import { SocialShareComponent } from 'src/app/components/social-share/social-share.component';

@Component({
  selector: 'app-episode-list-card-profile',
  templateUrl: './podcast-profile.component.html',
  styleUrls: ['./podcast-profile.component.scss']
})
export class PodcastProfileComponent implements OnInit {
  podcastData;
  playingId = 0;
  podcastId;
  showPlayer: boolean = true;
  progress: boolean = true;
  categoryBasedPodcastsLoading = false;

  //scroll
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  //paginate
  page = 0;
  pageSize = 10;
  sharedEpisode;
  sharedEpisodeLoading: Boolean = false;
  constructor(public rssFeedDetailsService: RssFeedDetailsService,
    public activatedRoute: ActivatedRoute, public playerService: PlayerService,
    private commonService : CommonService,
    private toastr: ToastrService,
    public authService: AuthService,
    public dialog: MatDialog,
    public router: Router,
  ) {
  }


  ngOnInit(): void {
    this.progress = true;
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.podcastId = paramMap.get('podcast_id');
      this.rssFeedDetailsService.getRssFeedDetails(paramMap.get('podcast_id'), this.page, this.pageSize).then(res => {
        this.podcastData = res['podcasts'][0]; //.find( podcast => podcast.id===parseInt(window.location.pathname.split('/')[2]));
        document.title = this.podcastData.name;
        this.progress = false;
      })
    });
    if (this.activatedRoute.snapshot.queryParamMap.get("episode_id")) {
      const episode_id = this.activatedRoute.snapshot.queryParamMap.get("episode_id");
      // this.sharedEpisode['id'] = episode_id;
      this.sharedEpisodeLoading = true;
      this.commonService
        .getEpisode(episode_id)
        .subscribe((res: any) => {
          console.log(res);
          this.sharedEpisodeLoading = false;
          this.sharedEpisode = res.episode;
        });
    }

    // console.log(this.route.snapshot.queryParamMap.get("expires_in"));

    // this.activatedRoute.paramMap.subscribe((paramMap) => {
    //   this.rssFeedDetailsService.getRssFeedDetails(parseInt(window.location.pathname.split('/')[2])).then(res => {
    //     this.activatedRoute.queryParams.subscribe( queryParams=>{
    //       this.podcastData = res['podcasts'].find( podcast => podcast.id===parseInt(window.location.pathname.split('/')[2]));
    //       this.progress = false;
    //     })

    //   })    
    // });
  }

  followPodcast(ifFollows) {
    if (this.podcastData.id) {
      let body = new FormData;
      if (this.authService.isAuthenticated()) {
        body.append('user_id', localStorage.getItem('userId'));
        body.append('podcast_id', this.podcastData.id);
        this.commonService.followPodcast(body).subscribe((res: any) => {
          this.podcastData.follows = true;
          // if(res.msg){
          //   this.toastr.error('Something went wrong');
          // }else{
          // }
        })
      } else {
        this.openHiveAuthDialog(false);
      }
    }
  }

  onScrollDown() {
    this.page += 1;
    this.categoryBasedPodcastsLoading = true;
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.podcastId = paramMap.get('podcast_id');
      this.rssFeedDetailsService.getRssFeedDetails(paramMap.get('podcast_id'), this.page, this.pageSize).then(res => {
        this.podcastData.Episodes = this.podcastData.Episodes.concat(res['podcasts'][0].Episodes); //.find( podcast => podcast.id===parseInt(window.location.pathname.split('/')[2]));
        this.categoryBasedPodcastsLoading = false;
      })
    });
  }

  openHiveAuthDialog(autoCheck: Boolean): void {
    this.dialog.open(HiveAuthComponent, {
      width: '800px',
      // height:  '350px',
      maxWidth: '95vw',
      hasBackdrop: true,
      data: { autoCheck: autoCheck }
    });
  }

  changePlaying(index) {
    this.showPlayer = false;
    this.playingId = index;
    console.log(this.playingId)
    setTimeout(() => {
      this.showPlayer = true;
    }, 50);
  }

  playEpisode(episodeData) {
    this.playerService.setCurrentModule(episodeData);
  }

  formatDuration(seconds) {
    return (Math.floor(moment.duration(seconds, 'seconds').asHours()) > 0 ? Math.floor(moment.duration(seconds, 'seconds').asHours()) + ':' : '') + moment.duration(seconds, 'seconds').minutes() + ':' + moment.duration(seconds, 'seconds').seconds();
  }

  tempdurationupvotes(sec) {
    return Math.floor(sec / 150);
  }


  socialShare(type, episodeData) {
    this.dialog.open(SocialShareComponent, {
      width: '400px',
      // height:  '350px',
      maxWidth: '95vw',
      hasBackdrop: true,
      data: { type: type, attributes: episodeData }
    });
  }
}
