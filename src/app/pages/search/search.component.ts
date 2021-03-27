import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeDashboardService } from 'src/app/pages/home-dashboard/home-dashboard.service';
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
  currentTab = 'Podcasts';
  isLoading: Boolean = true;
  searchResults = { EpisodeList: [], PodcastList: [] };

  //scroll
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  //paginate
  page = 0;
  pageSize = 10;

  constructor(public playerService: PlayerService, private activatedRoute: ActivatedRoute, private homeDashboardService: HomeDashboardService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.searchQuery = paramMap.get('query');
      this.page = 0;
      this.getSearchResults();
    });
  }

  getSearchResults() {
    this.isLoading = true;
    this.homeDashboardService.search(this.searchQuery, this.page, this.pageSize).subscribe((res: any) => {
      this.isLoading = false;
      console.log(res);
      this.searchResults.PodcastList = this.searchResults.PodcastList.concat(res.PodcastList);
      this.searchResults.EpisodeList = this.searchResults.EpisodeList.concat(res.EpisodeList);
    });
  }

  tabChanged(tabChangeEvent: number) {
    if (tabChangeEvent) {
      this.currentTab = 'Episodes';
    } else {
      this.currentTab = 'Podcasts';
    }
    console.log(this.currentTab);
    console.log(this.searchResults.EpisodeList);
  }


  formatDuration(seconds) {
    return (Math.floor(moment.duration(seconds, 'seconds').asHours()) > 0 ? Math.floor(moment.duration(seconds, 'seconds').asHours()) + ':' : '') + moment.duration(seconds, 'seconds').minutes() + ':' + moment.duration(seconds, 'seconds').seconds();
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
