import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api.service';


@Injectable({
  providedIn: 'root'
})
export class RssFeedDetailsService {
  apiUrl: string = environment.apiUrl;

  constructor(private api: ApiService) { }

  getRssFeedDetails(id, page, pageSize) {
    return this.api.get(this.apiUrl + '/public/podcast?podcast_id=' + id + '&user_id=' + localStorage.getItem('userId') + '&page=' + page + '&pageSize=' + pageSize).toPromise();
  }

  getPodcastEpisodes(id, page, pageSize) {
    return this.api.get(this.apiUrl + '/public/episode?podcast_id=' + id + '&user_id=' + localStorage.getItem('userId') + '&page=' + page + '&pageSize=' + pageSize).toPromise();
  }

  validateRssFeed(body) {
    return this.api.post(this.apiUrl + '/private/sendOTPMailVerify', body);
  }

  verifyOtpAndCreateRSS(body) {
    return this.api.post(this.apiUrl + '/private/verifyOtpAndCreateFromRss', body);
  }

  getSubmittedRssFeeds() {
    return this.api.get(this.apiUrl + '/private/getSubmittedRssFeeds?user_id=' + localStorage.getItem('userId'));
  }

}
