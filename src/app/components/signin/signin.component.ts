import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  email: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(
    private _toastrSvc: ToastrService,
    private _userSvc: UserService,
    private _errorSvc: ErrorService,
    private _router: Router
  ) { }

  login() {

    // Validamos que el usuario ingrese datos
    if (this.email == '' || this.password == '') {

      this._toastrSvc.error('Todos los campos son obligatorios', 'Error');
      return
    }

    // Creamos el body
    const user: User = {
      email: this.email,
      password: this.password
    }

    this.loading = true;

    this._userSvc.signin(user).subscribe({
      next: (token) => {
        localStorage.setItem('token', token);
        this._router.navigate(['/profile']);
      },
      error: (e: HttpErrorResponse) => {
        this._errorSvc.msgError(e);
        this.loading = false;
      }
    });
  }



}
