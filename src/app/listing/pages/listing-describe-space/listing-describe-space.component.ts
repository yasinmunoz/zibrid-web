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
  isCoworking: boolean = false;

  spaceDescription: string = '';
  spacePlaceDescription: string = '';
  beds: number = 0;
  bedrooms: number = 0;
  bathrooms: number = 0;
  workspaces: number = 0;

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

    window.addEventListener('beforeunload', this.onWindowClose);
  }

  async inicializate() {
    const landlordProperties = this.user.landlordProperties;
    const propertyId = this.user.landlordProperties[landlordProperties.length - 1];

    this._listingSvc.getSpace(propertyId).subscribe({

      next: (v) => {
        const space = v.space;
        console.log(space);
        this.beds = space.beds;
        this.bedrooms = space.bedrooms;
        this.bathrooms = space.bathrooms;
        this.workspaces = space.workspaces;
        this.spaceDescription = space.spaceDescription;
        this.spacePlaceDescription = space.spacePlaceDescription;
        if (space.type == 'Coworking') this.isCoworking = true;
        else this.isCoworking = false;
      },
      error: (e: HttpErrorResponse) => {
        this._errorSvc.msgError(e);
      }
    });
  }

  ngOnDestroy() {
    window.removeEventListener('beforeunload', this.onWindowClose);
  }


  increaseBeds() {
    this.beds += 1;
  }

  decreaseBeds() {
    this.beds -= 1;
    if (this.beds < 0) this.beds = 0;
  }

  increaseBedrooms() {
    this.bedrooms += 1;
  }

  decreaseBedrooms() {
    this.bedrooms -= 1;
    if (this.bedrooms < 0) this.bedrooms = 0;
  }

  increaseBathrooms() {
    this.bathrooms += 1;
  }

  decreaseBathrooms() {
    this.bathrooms -= 1;
    if (this.bathrooms < 0) this.bathrooms = 0;
  }

  increaseWorkspaces() {
    this.workspaces += 1;
  }

  decreaseWorkspaces() {
    this.workspaces -= 1;
    if (this.workspaces < 0) this.workspaces = 0;
  }

  addDescriptionSpace() {

    const propertyDescription: any = {
      email: this.user.email,

      beds: this.beds,
      bedrooms: this.bedrooms,
      bathrooms: this.bathrooms,
      workspaces: this.workspaces,
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
