import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Guest } from '../../interfaces/guest';
import { ErrorService } from '../../services/error.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup-guest',
  templateUrl: './signup-guest.component.html',
  styleUrls: ['./signup-guest.component.css']
})
export class SignupGuestComponent {

  name: string = '';
  lastName: string = '';  
  email: string = '';
  password: string = '';  
  confirmPassword: string = '';

  loading: boolean = false;

  constructor(
    private _toastrSvc: ToastrService,
    private _userSvc: AuthService,
    private _router: Router,
    private _errorSvc: ErrorService
  ) { }

  addUser() {

    if (this.email == '' || this.password == '' || this.confirmPassword == '') {
      this._toastrSvc.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    if (this.password != this.confirmPassword) {
      this._toastrSvc.error('Las passwords ingresadas son distintas', 'Error');
      return;
    }

    const guestUser: Guest = {
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      password: this.password,      
      role: 3
    };

    this.loading = true;

    this._userSvc.signup(guestUser).subscribe({

      next: (v) => {
        this.loading = false;
        this._toastrSvc.success(`El usuario ${this.email} ha sido registrado con éxito`, 'Usuario registrado');
        this._router.navigate(['/auth/signin']);
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this._errorSvc.msgError(e);
      }
    });

  }

}
