import { LoginService } from './services/login-service';
import { Component } from '@angular/core';
import { UserDetails } from './definitions/user-details';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  userDetails: UserDetails;

  constructor(private _router: Router, private loginService: LoginService) {
    this.loginService.currentUser.subscribe((x) => {
      this.userDetails = x;
      if (this.userDetails && this.userDetails.id > 0) {
      }
      else {
        this._router.navigate(['login']);
      }
    });
    // var u = localStorage.getItem('currentUser');
    // if (u) {
    //   this.userDetails = JSON.parse(u) as UserDetails;
    // }
    // else {
    //   this._router.navigate(['login']);
    // }
  }

  logout() {
    this.loginService.logout();
  }
}