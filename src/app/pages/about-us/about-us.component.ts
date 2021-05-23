import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor() { 
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  ngOnInit(): void {
  }

}
