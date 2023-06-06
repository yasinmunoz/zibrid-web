import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  propertyId?: any;

  user: any;
  isCoworking: boolean = false;

  mySpace: any;

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

    this._listingSvc.getPropertyById(this.propertyId).subscribe({

      next: (v) => {
        this.mySpace = v.property;
        console.log(this.mySpace);

        if (this.mySpace.type == 'Coworking') this.isCoworking = true;
        else this.isCoworking = false;
      },
      error: (e: HttpErrorResponse) => {
        this._errorSvc.msgError(e);
      }
    });
  }

  increaseBeds() {
    this.mySpace.beds += 1;
  }

  decreaseBeds() {
    this.mySpace.beds -= 1;
    if (this.mySpace.beds < 0) this.mySpace.beds = 0;
  }

  increaseBedrooms() {
    this.mySpace.bedrooms += 1;
  }

  decreaseBedrooms() {
    this.mySpace.bedrooms -= 1;
    if (this.mySpace.bedrooms < 0) this.mySpace.bedrooms = 0;
  }

  increaseBathrooms() {
    this.mySpace.bathrooms += 1;
  }

  decreaseBathrooms() {
    this.mySpace.bathrooms -= 1;
    if (this.mySpace.bathrooms < 0) this.mySpace.bathrooms = 0;
  }

  increaseWorkspaces() {
    this.mySpace.workspaces += 1;
  }

  decreaseWorkspaces() {
    this.mySpace.workspaces -= 1;
    if (this.mySpace.workspaces < 0) this.mySpace.workspaces = 0;
  }

  nextPage() {

    this._listingSvc.editProperty(this.propertyId, this.mySpace).subscribe({

      next: (v) => {
        console.log(v);
        this._router.navigate(['/listing/amenities-space', this.propertyId]);
      },
      error: (e: HttpErrorResponse) => {
        this._errorSvc.msgError(e);
      }
    });

  }

  back() {
    this._listingSvc.editProperty(this.propertyId, this.mySpace).subscribe({

      next: (v) => {
        console.log(v);
        this._router.navigate(['/listing/place-space', this.propertyId]);
      },
      error: (e: HttpErrorResponse) => {
        this._errorSvc.msgError(e);
      }
    });

  }

  ngOnDestroy() {
    window.removeEventListener('beforeunload', this.onWindowClose);
  }

  onWindowClose(event: BeforeUnloadEvent) {
    event.preventDefault();
    event.returnValue = 'Si recargas la página, perderás todos los datos que hayas ingresado';
  }
}
