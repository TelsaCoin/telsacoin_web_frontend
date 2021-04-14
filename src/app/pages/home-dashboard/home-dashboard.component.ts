import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.scss']
})
export class HomeDashboardComponent implements OnInit {
  routes = [
    {
      route : '',
      name : 'Discover',
      icon : 'explore'
    },
    {
      route : 'favorite',
      name : 'Favorite',
      icon : 'favorite'
    }
  ]
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  navigateTo(route){
    this.router.navigateByUrl(route);
  }

  isActive(route){
    return window.location.pathname == ('/' + route)
  }
}
