import { Component } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  user: any;

  constructor(
    private _jwtHelperSvc: JwtHelperService
  ) {

    const token = localStorage.getItem("token");

    if (token) {
      this.user = this._jwtHelperSvc.decodeToken(token);
      console.log(this.user.roles[0]);
    }
  }
}
