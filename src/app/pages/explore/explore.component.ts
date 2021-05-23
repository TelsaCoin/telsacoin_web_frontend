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
      name : 'Trending Podcasts',
      data : [],
      type : 'podcasts',
      isLoaded: false,
      page: -1,
      pageSize: 10
    },
    {
      name : 'New Podcasts',
      data : [],
      type : 'podcasts',
      isLoaded: false,
      page: -1,
      pageSize: 10
    },
  ]
  constructor(
    private commonService: CommonService,
  ) {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
   }

  ngOnInit(): void {
    this.getCategories();
    // this.getRecommendedEpisodes();
    this.getRecommendedPodcasts();
    this.getNewPodcasts();

  }

  getNewPodcasts(){
    this.tabsSection[2].page +=1;
    this.tabsSection[2].isLoaded = false;
    this.commonService.getExploreNewPodcasts(this.tabsSection[2].page, this.tabsSection[2].pageSize, this.selectedCategories.join(',')).subscribe((res:any) => {
      this.tabsSection[2].isLoaded = true;
      if(res.podcasts){
        this.tabsSection[2].data = [...this.tabsSection[2].data, ...res.podcasts];
      }else{
        this.tabsSection[2].data = [];
      }
    })
  }

  getRecommendedPodcasts(){
    this.tabsSection[1].page +=1;
    this.tabsSection[1].isLoaded = false;
    this.commonService.getExplorePodcasts(this.tabsSection[1].page, this.tabsSection[1].pageSize, this.selectedCategories.join(',')).subscribe((res:any) => {
      this.tabsSection[1].isLoaded = true;
      if(res.podcasts){
        this.tabsSection[1].data = res.podcasts;
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
        name : 'Trending Podcasts',
        data : [],
        type : 'podcasts',
        isLoaded: false,
        page: -1,
        pageSize: 10
      },
      {
        name : 'New Podcasts',
        data : [],
        type : 'podcasts',
        isLoaded: false,
        page: -1,
        pageSize: 10
      },
    ]
    this.getNewPodcasts();
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
