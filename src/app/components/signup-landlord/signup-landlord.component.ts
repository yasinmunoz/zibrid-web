import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';
import { Landlord } from '../../interfaces/landlord';

@Component({
  selector: 'app-signup-landlord',
  templateUrl: './signup-landlord.component.html',
  styleUrls: ['./signup-landlord.component.css']
})
export class SignupLandlordComponent {
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

    const landLordUser: Landlord = {
      email: this.email,
      password: this.password,
      role: 2
    };

    this.loading = true;

    this._userSvc.signup(landLordUser).subscribe({

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
