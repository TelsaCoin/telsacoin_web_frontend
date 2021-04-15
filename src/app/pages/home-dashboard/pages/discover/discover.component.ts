import { Component, OnInit } from '@angular/core';
import { HomeDashboardService } from 'src/app/pages/home-dashboard/home-dashboard.service';
import { trigger, transition, animate, style } from '@angular/animations'

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss'],
  animations:[
    trigger('fade', [
      transition('void => *', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]),
      transition('* => void', [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]),
    ])
  ]
})
export class DiscoverComponent implements OnInit {
  featuredPodcasts : any = [];
  current = 0;
  currentTab = 0;
  tabsSection = [
    {
      name : 'Trending on Hive',
      data : [],
      isLoaded: false
    },
    {
      name : 'Newly Released',
      data : [],
      isLoaded: false
    },
    {
      name : 'Recently Played',
      data : [],
      isLoaded: false
    },
    {
      name : 'Popular & Trending',
      data : [],
      isLoaded: false
    },
    {
      name : 'Recommended for you',
      data : [],
      isLoaded: false
    }
  ]
  constructor(
    private homeDashboardService: HomeDashboardService
  ) { }

  ngOnInit(): void {
    this.getFeaturedPodcasts();
    this.getHiveEpisodes();
  }

  getFeaturedPodcasts(){
    this.homeDashboardService.getFeaturedPodcasts(localStorage.getItem('userId')).subscribe((res:any) => {
      if(res.featured){
        this.featuredPodcasts = res.featured;
        setInterval(() => {
          this.current = ++this.current % this.featuredPodcasts.length;
        }, 3000);
      }
    })
  }

  getHiveEpisodes(){
    this.tabsSection[0].isLoaded = false;
    this.homeDashboardService.browseHiveEpisodes(0, 10).subscribe((res:any) => {
      this.tabsSection[0].isLoaded = true;
      if(res.EpisodeResult){
        this.tabsSection[0].data = res.EpisodeResult;
      }
    })
  }
}
