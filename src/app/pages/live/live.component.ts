import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent implements OnInit {

  constructor() { 
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  ngOnInit(): void {
  }

}
