import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { HomeDashboardService } from "src/app/pages/home-dashboard/home-dashboard.service";
import { DomSanitizer } from "@angular/platform-browser";
@Component({
  selector: "app-embed",
  templateUrl: "./embed.component.html",
  styleUrls: ["./embed.component.scss"],
})
export class EmbedComponent implements OnInit {
  progress: boolean = true;
  episodeId;
  episodeData;
  constructor(
    private activatedRoute: ActivatedRoute,
    private homeDashboardService: HomeDashboardService,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.progress = true;
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.episodeId = paramMap.get("episode_id");
      this.homeDashboardService
        .getEpisode(this.episodeId)
        .subscribe((res: any) => {
          console.log(res);
          this.progress = false;
          this.episodeData = res.episode;
        });
      this.homeDashboardService.getBadge(this.episodeId).subscribe((res: any) => {
        console.log(res);
      })
    });

  }

  getBadgeHtml(preview: Boolean) {
    let abc = `<a href="https://app.aureal.one/episode/${this.episodeId}"
    target="_blank">
    <img src="https://api.aureal.one/public/getBadge?episode_id=${this.episodeId}&theme=light" alt="Aureal 2.0 - The podcast platform that rewards you for interactions | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" />
    </a>`;
    if (preview) {
      return this.domSanitizer.bypassSecurityTrustHtml(abc);
    } else {
      return abc;
    }
  }
}
