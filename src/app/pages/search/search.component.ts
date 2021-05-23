import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {CommonService} from 'src/app/services/common.service';
import * as moment_ from 'moment';
const moment = moment_;
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchQuery = '';
  isLoading: Boolean = true;
  searchResults = { EpisodeList: [], PodcastList: [] };

  //scroll
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  //paginate
  page = 0;
  pageSize = 10;

  constructor(public playerService: PlayerService, private activatedRoute: ActivatedRoute, private commonService : CommonService, private router: Router) {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.searchQuery = paramMap.get('query');
      this.page = 0;
      this.searchResults = { EpisodeList: [], PodcastList: [] };
      this.getSearchResults();
    });
  }

  getSearchResults() {
    this.isLoading = true;
    this.commonService.search(this.searchQuery, this.page, this.pageSize).subscribe((res: any) => {
      this.isLoading = false;
      console.log(res);
      this.searchResults.PodcastList = this.searchResults.PodcastList.concat(res.PodcastList);
    });
  }


  formatDuration(seconds) {
    // return (Math.floor(moment.duration(seconds, 'seconds').asHours()) > 0 ? Math.floor(moment.duration(seconds, 'seconds').asHours()) + ':' : '') + moment.duration(seconds, 'seconds').minutes() + ':' + moment.duration(seconds, 'seconds').seconds();
    if(Math.floor(moment.duration(seconds, 'seconds').minutes()) > 0){
      return Math.floor(moment.duration(seconds, 'seconds').minutes()) + ' min';
    }else{
      return Math.floor(moment.duration(seconds, 'seconds').seconds()) + ' secs';
    }
  }

  playEpisode(episodeData) {
    this.playerService.setCurrentModule(episodeData);
  }

  redirectToPodcast(podcast) {
    this.router.navigateByUrl('podcast/' + podcast.id);
  }

  onScrollDown() {
    this.page += 1;
    this.getSearchResults();
  }

}
