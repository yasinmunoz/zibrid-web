import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListingService } from '../../services/listing.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/auth/services/error.service';


@Component({
  selector: 'app-listing-describe-space',
  templateUrl: './listing-describe-space.component.html',
  styleUrls: ['./listing-describe-space.component.css']
})
export class ListingDescribeSpaceComponent implements OnInit, OnDestroy {

  user: any;
  edit: boolean = false;

  spaceDescription: string = '';
  spacePlaceDescription: string = '';

  constructor(
    private _router: Router,
    private _listingSvc: ListingService,
    private _jwtHelperSvc: JwtHelperService,
    private _errorSvc: ErrorService
  ) {
    const token = localStorage.getItem("token");
    if (token) {
      this.user = this._jwtHelperSvc.decodeToken(token);
    }
  }
  ngOnInit(): void {
    
    console.log(history.state.data);
    if (history.state.data != undefined) {
      this.edit = true;
      const space = history.state.data.space;

      this.spaceDescription = space.spaceDescription;
      this.spacePlaceDescription = space.spacePlaceDescription;
    }

    window.addEventListener('beforeunload', this.onWindowClose);
  }

  ngOnDestroy() {
    window.removeEventListener('beforeunload', this.onWindowClose);
  }

  addDescriptionSpace() {

    const propertyDescription: any = {
      email: this.user.email,

      spaceDescription: this.spaceDescription,
      spacePlaceDescription: this.spacePlaceDescription
    };

    if (!this.edit) {
      const landlordProperties = this.user.landlordProperties;

      const propertyId = this.user.landlordProperties[landlordProperties.length - 1];
      this._listingSvc.editDescriptionSpace(propertyId, propertyDescription).subscribe({
        next: (v) => {
          console.log(v)
          this.nextPage();
        },
        error: (e: HttpErrorResponse) => {
          console.log(e);
          this._errorSvc.msgError(e);
        }
      })
    }
    else {
      const landlordProperties = this.user.landlordProperties;

      const propertyId = this.user.landlordProperties[landlordProperties.length - 1];

      this._listingSvc.editPlaceSpace(propertyId, propertyDescription).subscribe({

        next: (v) => {
          console.log(v);
          this.nextPage();
        },
        error: (e: HttpErrorResponse) => {
          this._errorSvc.msgError(e);
        }
      })
    }
  }

  nextPage() {

    const landlordProperties = this.user.landlordProperties;

    const propertyId = this.user.landlordProperties[landlordProperties.length - 1];
    this._listingSvc.getAmenitiesSpace(propertyId).subscribe({
      next: (v) => {        
        this._router.navigate(['/listing/amenities-space'], { state: { data: v } });
      },
      error: (e: HttpErrorResponse) => {
        this._errorSvc.msgError(e);
      }
    })    
  }

  back() {

    const landlordProperties = this.user.landlordProperties;

    const propertyId = this.user.landlordProperties[landlordProperties.length - 1];
    this._listingSvc.getSpace(propertyId).subscribe({
      next: (v) => {
        console.log(v);
        this._router.navigate(['/listing/place-space'], { state: { data: v } });
      },
      error: (e: HttpErrorResponse) => {
        this._errorSvc.msgError(e);
      }
    })
  }

  onWindowClose(event: BeforeUnloadEvent) {
    event.preventDefault();
    event.returnValue = 'Si recargas la página, perderás todos los datos que hayas ingresado';
  }
}
