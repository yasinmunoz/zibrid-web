import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ErrorService } from '../../services/error.service';
import { Landlord } from '../../interfaces/landlord';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup-landlord',
  templateUrl: './signup-landlord.component.html',
  styleUrls: ['./signup-landlord.component.css']
})
export class SignupLandlordComponent {
  
  name: string = '';
  lastName: string = '';  
  email: string = '';
  password: string = '';  
  confirmPassword: string = '';
  phone: string = '';

  loading: boolean = false;

  constructor(
    private _toastrSvc: ToastrService,
    private _userSvc: AuthService,
    private _router: Router,
    private _errorSvc: ErrorService
  ) { }

  addUser() {

    if (this.email == '' || this.password == '' || this.confirmPassword == '' || this.phone == '') {
      this._toastrSvc.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    if (this.password != this.confirmPassword) {
      this._toastrSvc.error('Las passwords ingresadas son distintas', 'Error');
      return;
    }

    const landLordUser: Landlord = {
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      phone: this.phone,
      role: 2
    };

    this.loading = true;

    this._userSvc.signup(landLordUser).subscribe({

      next: (v) => {
        this.loading = false;
        this._toastrSvc.success(`El usuario ${this.email} ha sido registrado con éxito`, 'Usuario registrado');
        this._userSvc.signin(landLordUser).subscribe({
          next: (token) => {
            localStorage.setItem('token', token);       
            this._router.navigate(['/listing/place-space']);     
          },
          error: (e: HttpErrorResponse) => {
            this._errorSvc.msgError(e);
            this.loading = false;
          }
        });        
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this._errorSvc.msgError(e);
      }
    });

  }
}
