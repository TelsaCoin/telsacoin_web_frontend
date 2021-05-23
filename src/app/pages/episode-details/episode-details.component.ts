import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import * as moment_ from 'moment';
const moment = moment_;
import {CommonService} from 'src/app/services/common.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from "@angular/material/dialog";
import { HiveAuthComponent } from 'src/app/components/hive-auth/hive-auth.component';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-episode-details',
  templateUrl: './episode-details.component.html',
  styleUrls: ['./episode-details.component.scss']
})
export class EpisodeDetailsComponent implements OnInit {
  episodeData;
  categoryBasedPodcastsLoading = false;
  categoryBasedPodcasts = [];
  comments;
  commentText = '';
  episodeId;
  isAddingComment = false;
  upvoteOngoing: Boolean = false;
  viewMoreDescription:Boolean = false;
  episodeLoading:Boolean = false;
  commentsLoading:Boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private commonService : CommonService, public authService: AuthService,
    private router: Router, private toastr: ToastrService, private activatedRoute: ActivatedRoute, public dialog: MatDialog, public playerService: PlayerService) {
    console.log(data);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    if (data && data.id) {
      this.episodeData = data;
      // let categoryIds = '';
      // this.episodeData['Categories'].forEach(element => {
      //   categoryIds += (element.id + '_');
      // });
      // if (categoryIds) {
      //   this.categoryBasedPodcastsLoading = true;
      //   this.commonService.categoryBasedPodcasts(0, 10, categoryIds).subscribe((res: any) => {
      //     this.categoryBasedPodcastsLoading = false;
      //     this.categoryBasedPodcasts = res.PodcastList;
      //     console.log(res);
      //   });
      // }
      this.getComments();
    } else {
      this.activatedRoute.paramMap.subscribe(paramMap => {
        this.episodeId = paramMap.get('episode_id');
        this.episodeLoading = true;
        this.commonService.getEpisode(this.episodeId).subscribe((res: any) => {
          console.log(res);
          this.episodeData = res.episode;
          this.episodeLoading = false;
          // let categoryIds = '';
          // this.episodeData['Categories'].forEach(element => {
          //   categoryIds += (element.id + '_');
          // });
          // if (categoryIds) {
          //   this.categoryBasedPodcastsLoading = true;
          //   this.commonService.categoryBasedPodcasts(0, 10, categoryIds).subscribe((res: any) => {
          //     this.categoryBasedPodcastsLoading = false;
          //     this.categoryBasedPodcasts = res.PodcastList;
          //     console.log(res);
          //   });
          // }
        });
        this.getComments();
      })
    }


  }

  ngOnInit(): void {
  }

  getComments() {
    this.commentsLoading = true;
    this.commonService.getComments(this.episodeId).subscribe((res: any) => {
      console.log(res);
      this.comments = res.comments;
      this.commentsLoading = false;
    })
  }

  formatDuration(seconds) {
    // return (Math.floor(moment.duration(seconds, 'seconds').asHours()) > 0 ? Math.floor(moment.duration(seconds, 'seconds').asHours()) + ':' : '') + moment.duration(seconds, 'seconds').minutes() + ':' + moment.duration(seconds, 'seconds').seconds();
    if(Math.floor(moment.duration(seconds, 'seconds').minutes()) > 0){
      return Math.floor(moment.duration(seconds, 'seconds').minutes()) + ' mins';
    }else{
      return Math.floor(moment.duration(seconds, 'seconds').seconds()) + ' secs';
    }
  }

  redirectToPodcast(podcast) {
    this.router.navigateByUrl('podcast/' + podcast.podcast_id);
  }

  addComment($event) {
    this.isAddingComment = true;
    let body = new FormData;
    body.append('user_id', localStorage.getItem('userId'));
    body.append('episode_id', this.episodeData.id);
    body.append('text', $event);
    body.append('hive_username', localStorage.getItem('hive_username'));
    this.commonService.addComment(body).subscribe((res: any) => {
      this.isAddingComment = false;
      if (res) {
        this.getComments();
      } else {
        this.toastr.error("Couldn't add comment");
      }
      console.log(res);
    });
  }

  closeComment() {

  }

  playEpisode(episodeData) {
    this.playerService.setCurrentModule(episodeData);
    this.addListen(episodeData);
  }

  upvote(episodeData) {
    // if(thi)
    this.upvoteOngoing = true;
    if (!this.authService.isAuthenticated()) {
      // this.router.navigateByUrl('/auth');
      this.openHiveAuthDialog(true);
      this.upvoteOngoing = false;
    } else {
      if (!this.authService.isHiveConnected()) {
        this.openHiveAuthDialog(true);
        this.upvoteOngoing = false;
      } else {
        let body = new FormData;
        body.append('permlink', episodeData.permlink);
        body.append('hive_username', localStorage.getItem('hive_username'));
        body.append('episode_id', episodeData.id);
        body.append('user_id', localStorage.getItem('userId'));
        console.log(body);
        this.commonService.upvoteEpisode(body).subscribe((res: any) => {
          this.upvoteOngoing = false;
          console.log(res);
          if (res.msg) {
            this.toastr.error(res.msg);
          } else if (res.err) {
            this.toastr.error('Something went wrong.');
          } else {
            this.episodeData.ifVoted = true;
            this.episodeData.votes = episodeData.votes + 1;
          }
        });
      }
    }
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

  addListen(episodeData) {
    let body = new FormData;
    body.append('episode_id', episodeData.id);
    body.append('user_id', localStorage.getItem('userId'));
    this.commonService.addListen(body).subscribe(res => {
      ;
    })
  }

  tipAuthor(episodeData){
    if(episodeData.author_hiveusername){
      window.open('https://buymeberri.es/@'+episodeData.author_hiveusername, "_blank")
      // window.location(episodeData.author_hiveusername);
    }
  }

  back(){
    history.back();
  }

  isPaidOut(){
    return moment().diff(this.episodeData.published_at, "days") > 7;
  }
}
