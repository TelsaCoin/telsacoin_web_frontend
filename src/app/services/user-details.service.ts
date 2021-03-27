import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  apiUrl: string = environment.apiUrl;
  public UserDetails;

  constructor(private api: ApiService) { }

  getUserDetails(id) {
    return this.api.get(this.apiUrl + '/private/users?user_id=' + id).toPromise();
  }


  updateUser(body) {
    return this.api.post(this.apiUrl + '/private/updateUser', body).toPromise();
  }


  uploadImage(body) {
    return this.api.post(this.apiUrl + '/private/getImageUrl', body).toPromise();
  }


  getUserHiveDetails() {
    return this.api.get(this.apiUrl + '/public/clientMe').toPromise();
  }

  claimRewards(body) {
    return this.api.post(this.apiUrl + '/private/claimRewards', body).toPromise();
  }

}
