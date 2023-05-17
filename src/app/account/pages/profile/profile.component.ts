import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountService } from '../../services/account.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/auth/services/error.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isLoading: boolean = true;
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
 
    this.isLoading = false;
    console.log(this.isLoading);
  }

  async inicializate() {


    this._accountSvc.getUser(this.userToken.id).subscribe({
      next: (v) => {
        this.user = v.data;
        this.isLoading = false;
      },
      error: (e: HttpErrorResponse) => {
        this._errorSvc.msgError(e);
      }
    })

  }

  showUserRoles(role: any) {
    if (role == 1) return 'Administrador';
    if (role == 2) return 'Propietario';
    if (role == 3) return 'Huésped';
    else return null
  }
}
