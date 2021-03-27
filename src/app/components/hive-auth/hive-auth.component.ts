import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-hive-auth',
  templateUrl: './hive-auth.component.html',
  styleUrls: ['./hive-auth.component.scss']
})
export class HiveAuthComponent implements OnInit {
  autoCheck: Boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public authService: AuthService) {
    console.log(data);
    this.autoCheck = data.autoCheck;
  }

  ngOnInit(): void {
  }


  connectHive(toConnectGoogleAccount) {
    let redirectUrl = 'http://localhost:4201/hive-token';
    if (environment.production) {
      redirectUrl = 'https://app.aureal.one/hive-token';
    }
    if (toConnectGoogleAccount) {
      redirectUrl += '-register';
    }
    window.open('https://hivesigner.com/oauth2/authorize?client_id=aureal&response_type=code&redirect_uri=' + redirectUrl + '&scope=vote,comment,comment_option,custom_json', '_self');
  }
}
