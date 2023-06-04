import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private _toastrSvc: ToastrService
  ) { }

  msgError(e: HttpErrorResponse) {
    if (e.error && e.error.msg) {
      this._toastrSvc.error(e.error.msg, 'Error');
    } else {
      this._toastrSvc.error('UPPS ocurrió un error, comuníquese con el administrador.', 'Error');
    }
  }

  customError(msg: string){
    this._toastrSvc.error(msg);
  }
  
}
