import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListingService } from '../../services/listing.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/auth/services/error.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-listing-price-images-space',
  templateUrl: './listing-price-images-space.component.html',
  styleUrls: ['./listing-price-images-space.component.css']
})
export class ListingPriceImagesSpaceComponent {

  user: any;
  edit: boolean = false;

  files: File[] = [];
  price: number = 10;
  errorMessage: string = '';

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

  increasePrice(): void {
    this.price += 1;
  }

  decreasePrice(): void {
    this.price -= 1;
    if(this.price < 0) this.price = 0;
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
    if (isNaN(this.price) || this.price < 0) {
      console.log(isNaN(this.price))
      this.price = 0
    }
  }

  nextPage () {
    const landlordProperties = this.user.landlordProperties;

    const propertyId = this.user.landlordProperties[landlordProperties.length - 1];

    const formData = new FormData();
    for (let file of this.files) {      
      formData.append('images', file);
      formData.set('propertyId', propertyId);
      formData.set('price', this.price.toString());
    }

    console.log(formData);
    
    this._listingSvc.createImages(formData).subscribe({
      next:(res) => {
        //console.log(res);
        this._router.navigate(['/listing/finish-listing']);
      },
      error: (e: HttpErrorResponse) => {
        this._errorSvc.msgError(e);
      }
    });
  }

  back () {

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

}
