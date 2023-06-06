import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingService } from '../../services/listing.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/auth/services/error.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-listing-price-images-space',
  templateUrl: './listing-price-images-space.component.html',
  styleUrls: ['./listing-price-images-space.component.css']
})
export class ListingPriceImagesSpaceComponent implements OnInit {

  propertyId?: any;

  user: any;
  isCoworking: boolean = false;

  mySpace: any;
  price: number = 10;

  files: File[] = [];
  errorMessage: string = '';

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
  }

  async inicializate() {
    this.propertyId = this._activatedRoute.snapshot.paramMap.get('id');

    this._listingSvc.getPropertyById(this.propertyId).subscribe({
      next: (v) => {
        this.mySpace = v.property;
        if (!this.mySpace.price) this.mySpace.price = this.price;        
        console.log(this.mySpace);

        if (this.mySpace.type == 'Coworking') this.isCoworking = true;
        else this.isCoworking = false;
      },
      error: (e: HttpErrorResponse) => {
        this._errorSvc.msgError(e);
      }
    });
  }

  increasePrice(): void {
    this.mySpace.price += 1;
  }

  decreasePrice(): void {
    this.mySpace.price -= 1;
    if (this.mySpace.price < 0) this.mySpace.price = 0;
  }

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  onBlur() {
    if (isNaN(this.mySpace.price) || this.mySpace.price < 0) {
      console.log(isNaN(this.mySpace.price))
      this.mySpace.price = 0
    }
  }

  nextPage() {
    const landlordProperties = this.user.landlordProperties;

    const propertyId = this.user.landlordProperties[landlordProperties.length - 1];

    const formData = new FormData();
    for (let file of this.files) {
      formData.append('images', file);
      formData.set('propertyId', propertyId);
      formData.set('price', this.mySpace.price.toString());
    }

    console.log(formData);

    this._listingSvc.uploadPropertyImagesAndSetPrice(formData).subscribe({
      next: (res) => {
        //console.log(res);
        this._router.navigate(['/listing/finish-listing']);
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
        this._router.navigate(['/listing/amenities-space', this.propertyId]);
      },
      error: (e: HttpErrorResponse) => {
        this._errorSvc.msgError(e);
      }
    });
  }
}
