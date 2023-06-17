import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { GoogleAuthService, UserInfo } from '../services/google-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user';
import { AuthService } from 'src/app/auth/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/auth/services/error.service';

@Component({
  selector: 'app-google-auth-page',
  templateUrl: './google-auth-page.component.html',
  styleUrls: ['./google-auth-page.component.css']
})
export class GoogleAuthPageComponent {

  previousUrl!: string | null;
  userGoogle?: UserInfo;
  typeAuth: string | undefined;

  constructor(
    private _googleAuthSvc: GoogleAuthService,
    private _router: Router,
    private _userSvc: AuthService,
    private _errorSvc: ErrorService
  ) {    
    _googleAuthSvc.userProfileSubject.subscribe(data => {
      this.userGoogle = data;
      this.getUser();
    })
  }

  getUser() {    
    // Creamos el body
    const user: any = {
      email: this.userGoogle?.info.email,
      lastName: this.userGoogle?.info.family_name,
      name: this.userGoogle?.info.given_name
    }

    this._googleAuthSvc.signinGoogle(user).subscribe({
      next: (token) => {        
        localStorage.setItem('token', token);
        this.previousUrl = localStorage.getItem('access_google_checkout');

        if (this.previousUrl == 'show-space') this._router.navigate(['/booking/confirm-booking']);      
        else this._router.navigate(['/account']);
        
        localStorage.removeItem('access_google_checkout');
      },
      error: (e: HttpErrorResponse) => {
        sessionStorage.clear();        
        this._errorSvc.msgError(e);

        this._router.navigate(['/auth/signin']).then(() => {
          window.location.reload();
        });        
      }
    });

  }

  createUser() {
    console.log('Create user');
    console.log(this.userGoogle);
  }

  isLoggedIn(): boolean {
    return this._googleAuthSvc.isLoggedIn()
  }

  logout() {
    sessionStorage.clear();
    this._router.navigate(['/auth/signin']).then(() => {
      window.location.reload();
    });
  }

}
