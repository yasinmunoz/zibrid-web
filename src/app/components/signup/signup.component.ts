import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Tenant } from 'src/app/interfaces/tenant';

import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';

import { User } from '../../interfaces/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {



  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  loading: boolean = false;

  constructor(
    private _toastrSvc: ToastrService,
    private _userSvc: UserService,
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

    const tenantUser: Tenant = {
      email: this.email,
      password: this.password,
      role: 3
    };

    this.loading = true;

    this._userSvc.signup(tenantUser).subscribe({

      next: (v) => {
        this.loading = false;
        this._toastrSvc.success(`El usuario ${this.email} ha sido registrado con éxito`, 'Usuario registrado');
        this._router.navigate(['/signin']);
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this._errorSvc.msgError(e);
      }
    });

  }

}
