import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ErrorService } from '../../services/error.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  email: string = '';
  password: string = '';
  loading: boolean = false;
  previousUrl: string = '';

  constructor(
    private _router: Router,
    private _toastrSvc: ToastrService,
    private _userSvc: AuthService,
    private _errorSvc: ErrorService,
    private _route: ActivatedRoute
  ) { }

  login() {


    // Validamos que el usuario ingrese datos
    if (this.email == '' || this.password == '') {
      console.log(this.email);
      this._toastrSvc.error('Todos los campos son obligatorios', 'Error');
      return
    }

    // Creamos el body
    const user: User = {
      email: this.email,
      password: this.password,
    }

    this.loading = true;

    this.previousUrl = history.state.data;

    this._userSvc.signin(user).subscribe({
      next: (token) => {
        localStorage.setItem('token', token);

        if (this.previousUrl == 'show-space') {
          this._router.navigate(['/booking/confirm-booking']);
        }
        else {
          this._router.navigate(['/account']);
        }
      },
      error: (e: HttpErrorResponse) => {
        this._errorSvc.msgError(e);
        this.loading = false;
      }
    });
  }

  continueWithGoogle() {
    if (history.state.data == 'show-space') {
      this._router.navigate(['/google-auth/signin'], { state: { data: 'show-space' } });
    }
    else {
      this._router.navigate(['/google-auth/signin']);
    }

  }
}
