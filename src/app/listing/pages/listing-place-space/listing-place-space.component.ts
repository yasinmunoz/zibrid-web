import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PropertyPlace } from 'src/app/listing/interfaces/propertyplace';
import { ListingService } from '../../services/listing.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/auth/services/error.service';

@Component({
  selector: 'app-listing-place-space',
  templateUrl: './listing-place-space.component.html',
  styleUrls: ['./listing-place-space.component.css']
})
export class ListingPlaceSpaceComponent implements OnInit, OnDestroy {

  user: any;
  edit: boolean = false;

  name: string = '';
  type: string = '';
  country: string = '';
  address: string = '';
  complementaryAddress: string = '';
  city: string = '';
  province: string = '';
  state: string = '';
  zip: string = '';

  constructor(
    private _router: Router,
    private _jwtHelperSvc: JwtHelperService,
    private _listingSvc: ListingService,
    private _errorSvc: ErrorService
  ) {
    const token = localStorage.getItem("token");
    if (token) {
      this.user = this._jwtHelperSvc.decodeToken(token);
    }
  }
  ngOnInit(): void {

    console.log(history.state.data);
    console.log(this.edit);
    if (history.state.data != undefined) {
      this.edit = true;
      const space = history.state.data.space;
      
      this.name = space.name;
      this.type = space.type;
      this.country = space.country;
      this.address = space.address;
      this.complementaryAddress = space.complementaryAddress;
      this.city = space.city;
      this.province = space.province;
      this.state = space.state;
      this.zip = space.zip;

    }

    window.addEventListener('beforeunload', this.onWindowClose);
  }

  ngOnDestroy() {
    window.removeEventListener('beforeunload', this.onWindowClose);
  }

  addPlaceSpace() {

    const propertyPlace: PropertyPlace = {
      email: this.user.email,

      name: this.name,
      type: this.type,
      country: this.country,
      address: this.address,
      complementaryAddress: this.complementaryAddress,
      city: this.city,
      province: this.province,
      state: this.state,
      zip: this.zip
    };

    if (!this.edit) {
      this._listingSvc.createPlaceSpace(propertyPlace).subscribe({
        next: (v) => {
          if (v.token) {
            localStorage.setItem('token', v.token);
            const token = localStorage.getItem("token");
            if (token) {
              this.user = this._jwtHelperSvc.decodeToken(token);
            }
          }
          this.nextPage();
        },
        error: (e: HttpErrorResponse) => {
          this._errorSvc.msgError(e);
        }
      })
    }
    else {
      const landlordProperties = this.user.landlordProperties;

      const propertyId = this.user.landlordProperties[landlordProperties.length - 1];

      this._listingSvc.editPlaceSpace(propertyId, propertyPlace).subscribe({

        next: (v) => {          
          this.nextPage();
        },
        error: (e: HttpErrorResponse) => {
          this._errorSvc.msgError(e);
        }
      });
    }
  }

  nextPage() {

    const landlordProperties = this.user.landlordProperties;

    const propertyId = this.user.landlordProperties[landlordProperties.length - 1];
    console.log(propertyId);
    this._listingSvc.getSpace(propertyId).subscribe({
      next: (v) => {        
        this._router.navigate(['/listing/describe-space']);
      },
      error: (e: HttpErrorResponse) => {
        this._errorSvc.msgError(e);
      }
    })    
  }

  back() {
    this._router.navigate(['/listing/about-landlord']);
  }

  onWindowClose(event: BeforeUnloadEvent) {
    event.preventDefault();
    event.returnValue = 'Si recargas la página, perderás todos los datos que hayas ingresado';
  }
}
