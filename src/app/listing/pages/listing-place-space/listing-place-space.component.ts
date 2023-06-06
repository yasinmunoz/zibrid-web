import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  propertyId?: any;

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
    private _activatedRoute: ActivatedRoute,
    private _listingSvc: ListingService,
    private _errorSvc: ErrorService
  ) {
    const token = localStorage.getItem("token");
    if (token) {
      this.user = this._jwtHelperSvc.decodeToken(token);
    }
  }

  ngOnInit(): void {

    this.inicializate();

    window.addEventListener('beforeunload', this.onWindowClose);
  }

  async inicializate() {

    this.propertyId = this._activatedRoute.snapshot.paramMap.get('id');

    if (this.propertyId) {
      console.log('Comprobación del id', this.propertyId);
      console.log('Estamos editando');
      this.edit = true;

      this._listingSvc.getPropertyById(this.propertyId).subscribe({
        next: async (v) => {
          const space = v.property;
          console.log(v.property);

          this.name = space.name;
          this.type = space.type;
          this.country = space.country;
          this.address = space.address;
          this.complementaryAddress = space.complementaryAddress;
          this.city = space.city;
          this.province = space.province;
          this.state = space.state;
          this.zip = space.zip;
        },
        error: (e: HttpErrorResponse) => {
          this._errorSvc.msgError(e);
        }
      });

    } else {
      console.log('Estamos creando');
    }
  }

  nextPage() {

    const property: PropertyPlace = {
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
      
      this._listingSvc.createProperty(property).subscribe({
        next: (v) => {
          if (v.token) {
            localStorage.setItem('token', v.token);
            const token = localStorage.getItem("token");
            console.log(token);
            if (token) {
              this.user = this._jwtHelperSvc.decodeToken(token);
              const landlordProperties = this.user.landlordProperties;

              this.propertyId = this.user.landlordProperties[landlordProperties.length - 1];
            }
          }
          this._router.navigate(['/listing/describe-space/', this.propertyId]);
        },
        error: (e: HttpErrorResponse) => {
          this._errorSvc.msgError(e);
        }
      })
    }
    else {
      this._listingSvc.editProperty(this.propertyId, property).subscribe({

        next: (v) => {
          this._router.navigate(['/listing/describe-space/', this.propertyId]);
        },
        error: (e: HttpErrorResponse) => {
          this._errorSvc.msgError(e);
        }
      });
    }

  }

  back() {
    this._router.navigate(['/listing/about-landlord']);
  }

  ngOnDestroy() {
    window.removeEventListener('beforeunload', this.onWindowClose);
  }

  onWindowClose(event: BeforeUnloadEvent) {
    event.preventDefault();
    event.returnValue = 'Si recargas la página, perderás todos los datos que hayas ingresado';
  }

}
