import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  categories = [];
  selectedCategories = [];
  tabsSection = [
    {
      name : 'Recommended Episodes',
      data : [],
      type : 'episodes',
      isLoaded: false,
      page: -1,
      pageSize: 5
    },
    {
      name : 'Recommended Podcasts',
      data : [],
      type : 'podcasts',
      isLoaded: false,
      page: -1,
      pageSize: 6
    },
  ]
  constructor(
    private commonService: CommonService,
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getRecommendedEpisodes();
    this.getRecommendedPodcasts();
  }

  getRecommendedEpisodes(){
    this.tabsSection[0].page +=1;
    this.tabsSection[0].isLoaded = false;
    this.commonService.recommendedEpisodes(this.tabsSection[0].page, this.tabsSection[0].pageSize, this.selectedCategories.join(',')).subscribe((res:any) => {
      this.tabsSection[0].isLoaded = true;
      if(res.EpisodeResult){
        this.tabsSection[0].data = [...this.tabsSection[0].data, ...res.EpisodeResult];
      }
    })
  }

  getRecommendedPodcasts(){
    this.tabsSection[1].page +=1;
    this.tabsSection[1].isLoaded = false;
    this.commonService.getRecommendedPodcasts(this.tabsSection[1].page, this.tabsSection[1].pageSize).subscribe((res:any) => {
      this.tabsSection[1].isLoaded = true;
      if(res.for_you){
        this.tabsSection[1].data = res.for_you;
      }
    })
  }

  filterByCategory(){
    this.tabsSection = [
      {
        name : 'Recommended Episodes',
        data : [],
        type : 'episodes',
        isLoaded: false,
        page: -1,
        pageSize: 5
      },
      {
        name : 'Recommended Podcasts',
        data : [],
        type : 'podcasts',
        isLoaded: false,
        page: -1,
        pageSize: 6
      },
    ];
    this.getRecommendedEpisodes();
    this.getRecommendedPodcasts();
  }

  getCategories(){
    this.commonService.getCategories().subscribe((res:any) =>{
      this.categories = res.allCategory;
    })
  }

  selectCategory(category){
    this.selectedCategories = [...this.selectedCategories, ...[category.id]];
    this.filterByCategory();
  }

  removeSelectedCategory(category){
    let index = this.selectedCategories.indexOf(category.id)
    if(index > -1){
      this.selectedCategories.splice(index, 1);
      this.filterByCategory();
    }

  }

}
