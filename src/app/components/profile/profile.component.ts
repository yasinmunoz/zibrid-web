import { Component } from '@angular/core';

import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  user: any;

  constructor(
    private _jwtHelperSvc: JwtHelperService
  ) {

    const token = localStorage.getItem("token");

    if (token) {
      this.user = this._jwtHelperSvc.decodeToken(token);
      console.log(this.user);
    }
  }

}
