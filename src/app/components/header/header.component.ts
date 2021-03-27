import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import * as moment_ from 'moment';
const moment = moment_;
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { HiveAuthComponent } from 'src/app/components/hive-auth/hive-auth.component';
import { UserDetailsService } from 'src/app/services/user-details.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input("sidenav") sidenav;
  @ViewChild('searchbar') searchbar: ElementRef;

  toggleSearch: boolean = false;
  searchText = '';

  constructor(public authService: AuthService, private route: ActivatedRoute, public router: Router, public dialog: MatDialog, public userDetailsService: UserDetailsService) { }

  ngOnInit(): void {
    let a = parseInt((moment().unix()).toString()) + 68400;
    let b = moment().unix();
    console.log(a - b);
    if (!this.authService.isHiveConnected() && this.authService.isAuthenticated()) {
      this.openHiveAuthDialog(true);
    }
    if (!this.userDetailsService.UserDetails && this.authService.isAuthenticated()) {
      this.userDetailsService.getUserDetails(localStorage.getItem('userId')).then((res: any) => {
        console.log(res);
        this.userDetailsService.UserDetails = res.users;
      });
    }
  }

  navigateHome() {
    this.router.navigateByUrl('/');
  }

  keyDownFunction(event) {
    console.log(event);
    if (event.code == 'Enter') {
      this.searchWord();
    }
  }

  redirectPost() {
    this.router.navigateByUrl('post');
  }

  openSidebar() {
    this.sidenav.toggle();
  }

  openSearch() {
    this.toggleSearch = true;
    setTimeout(() => {
      console.log(this.searchbar.nativeElement);
      this.searchbar.nativeElement.focus();
    }, 500);
  }

  searchClose() {
    this.searchText = '';
    this.toggleSearch = false;
  }

  searchWord() {
    console.log(this.searchText);
    if (this.searchText) {
      this.router.navigateByUrl('search/' + this.searchText);
    }
  }

  openHiveAuthDialog(autoCheck: Boolean): void {
    this.dialog.open(HiveAuthComponent, {
      width: '400px',
      // height:  '350px',
      maxWidth: '95vw',
      hasBackdrop: true,
      data: { autoCheck: autoCheck }
    });
  }

  goToProfile() {
    this.router.navigateByUrl('/profile');
  }
}
