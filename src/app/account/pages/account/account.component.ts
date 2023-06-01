import { Component, OnInit } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';
import { ErrorService } from 'src/app/auth/services/error.service';
import { AccountService } from '../../services/account.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  
  userToken: any;
  user: any;

  constructor(
    private _jwtHelperSvc: JwtHelperService,
    private _accountSvc: AccountService,
    private _errorSvc: ErrorService
  ) {

    const token = localStorage.getItem("token");

    if (token) {
      this.userToken = this._jwtHelperSvc.decodeToken(token);      
    }
  }
  ngOnInit(): void {
    this.inicializate();

    console.log(this.userToken);    
  }

  async inicializate() {


    this._accountSvc.getUser(this.userToken.id).subscribe({
      next: (v) => {
        this.user = v.data;
        console.log(this.user);
      },
      error: (e: HttpErrorResponse) => {
        this._errorSvc.msgError(e);
      }
    })

  }
}
