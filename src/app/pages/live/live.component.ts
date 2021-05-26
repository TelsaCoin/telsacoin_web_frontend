import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent implements OnInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) { 
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }

  ngOnInit(): void {
  }

}
