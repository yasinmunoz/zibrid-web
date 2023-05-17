import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListingService } from '../../services/listing.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ErrorService } from 'src/app/auth/services/error.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-listing-amenities-space',
  templateUrl: './listing-amenities-space.component.html',
  styleUrls: ['./listing-amenities-space.component.css']
})
export class ListingAmenitiesSpaceComponent implements OnInit, OnDestroy {

  user: any;
  edit: boolean = false;

  allAmenities: any[] = [];
  amenitiesProperty: any[] = [];
  amenitiesPropertyNames: any[] = [];

  ergonomicChair: boolean = true;
  adjustableDesk: boolean = false;
  highSpeedInternet: boolean = true;

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

    this.inicializate();

    if (history.state.data != undefined) {
      this.edit = true;
      this.amenitiesProperty = history.state.data.space.propertyAmenities;

      this.amenitiesPropertyNames = this.amenitiesProperty.map((amenity: any) => amenity.name);
    }

    window.addEventListener('beforeunload', this.onWindowClose);
  }

  async inicializate() {

    this._listingSvc.getAllAmenities().subscribe({
      next: (v) => {
        this.allAmenities = v.data.allAmenities;
      },
      error: (e: HttpErrorResponse) => {
        this._errorSvc.msgError(e);
      }
    })

  }

  ngOnDestroy() {
    window.removeEventListener('beforeunload', this.onWindowClose);
  }

  toggleAmenitySelection(amenity: any, event: any) {

    const amenityName = amenity.name;

    if (event.target.checked) {
      this.amenitiesProperty.push(amenity);
    } else {
      const index = this.amenitiesProperty.findIndex(a => a.name === amenityName);
      if (index !== -1) {
        this.amenitiesProperty.splice(index, 1);
      }
    }

    console.log(this.amenitiesProperty);
  }

  nextPage() {

    this._router.navigate(['/listing/price-images-space']);
  }

  back() {

    const landlordProperties = this.user.landlordProperties;

    const propertyId = this.user.landlordProperties[landlordProperties.length - 1];
    this._listingSvc.getSpace(propertyId).subscribe({
      next: (v) => {
        console.log(v);
        this._router.navigate(['/listing/describe-space'], { state: { data: v } });
      },
      error: (e: HttpErrorResponse) => {
        this._errorSvc.msgError(e);
      }
    })

  }

  addAmenitiesSpace() {
    const landlordProperties = this.user.landlordProperties;

    const propertyId = this.user.landlordProperties[landlordProperties.length - 1];

    console.log(this.amenitiesProperty);

    this._listingSvc.editAmenitiesSpace(propertyId, this.amenitiesProperty).subscribe({
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

  onWindowClose(event: BeforeUnloadEvent) {

    event.preventDefault();
    event.returnValue = 'Si recargas la página, perderás todos los datos que hayas ingresado';
  }

}
