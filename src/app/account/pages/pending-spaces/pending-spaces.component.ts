import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountService } from '../../services/account.service';
import { ErrorService } from 'src/app/auth/services/error.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-pending-spaces',
  templateUrl: './pending-spaces.component.html',
  styleUrls: ['./pending-spaces.component.css']
})
export class PendingSpacesComponent implements OnInit {

  pendingSpaces: any[] = [];

  constructor(
    private _jwtHelperSvc: JwtHelperService,
    private _accountSvc: AccountService,
    private _errorSvc: ErrorService,
    private _router: Router
  ) { }

  ngOnInit(): void {

    this.inicializate();
  }

  async inicializate() {

    this._accountSvc.getPendingProperties().subscribe({
      next: (v) => {
        console.log(v.data);
        this.pendingSpaces = v.data;
      },
      error: (e: HttpErrorResponse) => {
        this._errorSvc.msgError(e);
      }
    })

  }

  editSpace(pendingSpaceId: number) {
    console.log(pendingSpaceId);
    this._router.navigate(['account/edit-my-space', pendingSpaceId], { state: { data: 'edit-pending-space' } });    
  }

  deleteSpace(pendingSpaceId: number) {

    this._accountSvc.deleteProperty(pendingSpaceId).subscribe({
      next: (v) => {
        const deletedSpace = v.data;
        this.pendingSpaces = this.pendingSpaces.filter((item: { id: any; }) => item.id !== deletedSpace.id);
      },
      error: (e: HttpErrorResponse) => {
        this._errorSvc.msgError(e);
      }
    })
  }

  validateSpace(pendingSpace: any) {
      
    this._accountSvc.validateProperty(pendingSpace.id, pendingSpace).subscribe({
      next: (v) => {
        const verifiedSpace = v.data;        
        this.pendingSpaces = this.pendingSpaces.filter((item: { id: any; }) => item.id !== verifiedSpace.propertyId);        
      },
      error: (e: HttpErrorResponse) => {
        this._errorSvc.msgError(e);
      }
    });
  }
}
