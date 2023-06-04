import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  propertyId?: any;

  user: any;
  isCoworking: boolean = false;

  mySpace: any;
  allAmenities: any;
  amenitiesProperty: any[] = [];

  amenitiesPropertyNames: any[] = [];

  constructor(
    private _router: Router,
    private _listingSvc: ListingService,
    private _jwtHelperSvc: JwtHelperService,
    private _activatedRoute: ActivatedRoute,
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

    this._listingSvc.getAllAmenities().subscribe({
      next: (v) => {
        this.allAmenities = v.data.allAmenities;
        //console.log(this.allAmenities);
      },
      error: (e: HttpErrorResponse) => {
        this._errorSvc.msgError(e);
      }
    });

    this._listingSvc.getSpace(this.propertyId).subscribe({
      next: (v) => {
        this.mySpace = v.space;
        console.log(this.mySpace);

        this.amenitiesPropertyNames = this.mySpace.amenities.map((amenity: { name: any; }) => amenity.name);
        this.amenitiesProperty = this.mySpace.amenities;
        //console.log(this.amenitiesProperty);

        if (this.mySpace.type == 'Coworking') this.isCoworking = true;
        else this.isCoworking = false;
      },
      error: (e: HttpErrorResponse) => {
        this._errorSvc.msgError(e);
      }
    });


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

    this.mySpace.amenities = this.amenitiesProperty;
  }
  
  nextPage() {

    if (this.mySpace.amenities.length === 0) {
      this._errorSvc.customError('Seleccione al menos una comodidad');
    } else {
      this._listingSvc.editPlaceSpace(this.propertyId, this.mySpace).subscribe({

        next: (v) => {
          this._router.navigate(['/listing/price-images-space', this.propertyId]);
        },
        error: (e: HttpErrorResponse) => {
          this._errorSvc.msgError(e);
        }
      });
    }

  }

  back() {
    if (this.mySpace.amenities.length === 0) {
      this._errorSvc.customError('Seleccione al menos una comodidad');
    } else {
      this._listingSvc.editPlaceSpace(this.propertyId, this.mySpace).subscribe({

        next: (v) => {
          this._router.navigate(['/listing/describe-space', this.propertyId]);
        },
        error: (e: HttpErrorResponse) => {
          this._errorSvc.msgError(e);
        }
      });
    }

  }

  ngOnDestroy() {
    window.removeEventListener('beforeunload', this.onWindowClose);
  }

  onWindowClose(event: BeforeUnloadEvent) {
    event.preventDefault();
    event.returnValue = 'Si recargas la página, perderás todos los datos que hayas ingresado';
  }

}
