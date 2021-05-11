import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { MatSidenav } from "@angular/material/sidenav";
import { ActivatedRoute, Router } from "@angular/router";
import { SwUpdate } from '@angular/service-worker';

import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import {CommonService} from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { HiveAuthComponent } from 'src/app/components/hive-auth/hive-auth.component';
import { MatDialog } from "@angular/material/dialog";
import {
  trigger,
  animate,
  transition,
  style,
  query
} from '@angular/animations';
import { appConstants } from './app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [style({ opacity: 0 })],
          { optional: true }
        ),
        query(
          ':leave',
          [style({ opacity: 1 }), animate('0.5s', style({ opacity: 0 }))],
          { optional: true }
        ),
        query(
          ':enter',
          [style({ opacity: 0 }), animate('0.5s', style({ opacity: 1 }))],
          { optional: true }
        )
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  
  appMode = 'side';
  isSidebarOpened = true;
  isSidebarExpanded = false;
  title = 'Aureal - Podcast Rating Platform';
  playingEpisode;
  currentModule;
  isEmbedPlayer: Boolean = false;
  @ViewChild("sidenav") usuarioMenu: MatSidenav;
  @ViewChild("content") content: ElementRef;

  routes = appConstants.routes;

  constructor(
    public playerService: PlayerService,
    public router: Router,
    private update: SwUpdate, 
    private authService: SocialAuthService,
    public commonService : CommonService,
    private toastr: ToastrService,
    public dialog: MatDialog
    ) {
    if(this.commonService.isMobile()){
      this.appMode = 'over';
      this.isSidebarOpened = false;
    }

    this.currentModule = this.playerService.getCurrentModule();
    this.updateClient();
    if(window.location.pathname.split('/')[1] == 'embed-player'){
      this.isEmbedPlayer = true;
    }else{
      this.isEmbedPlayer = false;
    }
    console.log(this.isEmbedPlayer);

  }
  
  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      
      // this.user = user;
      // this.loggedIn = (user != null);
      if(user.idToken){
        let body = new FormData;
        body.append('identifier', user.idToken);
        body.append('loginType', 'google');
        this.commonService.userAuth(body).subscribe((res:any) => {
          localStorage.setItem('userId',res.userData.id);
          localStorage.setItem('userName',res.userData.username);
          localStorage.setItem('token',res.userData.token);
          if(res.userData.hiveAccessToken){
            localStorage.setItem('access_token',res.userData.hiveAccessToken);
          }
          if(res.userData.hive_username){
            localStorage.setItem('hive_username',res.userData.hive_username);
          }
          location.reload();
          this.router.navigateByUrl('/');
        })
      }else{
        this.toastr.error('Something went wrong');
      }
    });
    this.currentModule.subscribe( current =>{
      console.log(current);
      if(current){
        if(this.playingEpisode && current.id != this.playingEpisode.id){
          this.playingEpisode = current;
        }else{
          this.playingEpisode = current;
        }
        console.log('wertyuiop',this.playingEpisode);
  
      }
    });  
  }

  navigateTo(route){
    this.router.navigateByUrl(route);
  }

  isActive(route){
    return window.location.pathname == ('/' + route)
  }

  updateClient() {
    if (!this.update.isEnabled) {
      console.log('Not Enabled');
      return;
    }
    this.update.available.subscribe((event) => {
      console.log(`current`, event.current, `available `, event.available);
      if (confirm('Update available ! Please click on Ok to update.')) {
        this.update.activateUpdate().then(() => location.reload());
      }
    });

    this.update.activated.subscribe((event) => {
      console.log(`current`, event.previous, `available `, event.current);
    });
  }

  check(){
    document.body.onkeyup = function(e){
      console.log(e);
    }
  }

  navigateHome(){
    this.router.navigateByUrl('/');
  }

  closeAllSidenav() {
    this.usuarioMenu.close();
  }

  openAuth(): void {
    this.dialog.open(HiveAuthComponent, {
      width: '800px',
      // height:  '350px',
      maxWidth: '95vw',
      hasBackdrop: true,
      data: { autoCheck: false }
    });
  }

  // openSidebar(){
  //   this.isSidebarExpanded = true;
  //   this.content.nativeElement.style.marginLeft = '250px';
  // }

  // closeSidebar(){
  //   this.isSidebarExpanded = false;
  //   this.content.nativeElement.style.marginLeft = '100px';
  // }
}
