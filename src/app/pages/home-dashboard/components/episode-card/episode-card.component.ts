import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-episode-card',
  templateUrl: './episode-card.component.html',
  styleUrls: ['./episode-card.component.scss']
})
export class EpisodeCardComponent implements OnInit {
  @Input() episodeData;

  constructor() { }

  ngOnInit(): void {
  }

}
