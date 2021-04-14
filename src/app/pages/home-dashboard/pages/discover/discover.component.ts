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
  constructor(
    private homeDashboardService: HomeDashboardService
  ) { }

  ngOnInit(): void {
    this.getFeaturedPodcasts();

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
}
