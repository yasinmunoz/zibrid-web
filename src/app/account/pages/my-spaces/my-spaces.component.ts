import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountService } from '../../services/account.service';
import { ErrorService } from 'src/app/auth/services/error.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-spaces',
  templateUrl: './my-spaces.component.html',
  styleUrls: ['./my-spaces.component.css']
})
export class MySpacesComponent implements OnInit {

  userToken: any;
  properties!: any[];
  images: any[] = [];
  imageUrls: string[] = []; // Array de URLs generadas para las imágenes
  mySpaces: any[] = [];

  constructor(
    private _jwtHelperSvc: JwtHelperService,
    private _accountSvc: AccountService,
    private _errorSvc: ErrorService,
    private _router: Router
  ) {

    const token = localStorage.getItem("token");

    if (token) {
      this.userToken = this._jwtHelperSvc.decodeToken(token);
    }

  }

  ngOnInit(): void {

    this.inicializate();
  }

  async inicializate() {

    this._accountSvc.getPropertiesByUser(this.userToken.id).subscribe({
      next: async (v) => {
        this.properties = v.data;
        console.log(this.properties);
        this.setData();
      },
      error: (e: HttpErrorResponse) => {
        this._errorSvc.msgError(e);
      }
    });
  }

  // Preparo los datos que voy a mostrar salvo la imageBlobURL
  setData() {
    for (let i = 0; i < this.properties.length; i++) {
      const property = this.properties[i];
      console.log(property.Images.length);

      this.mySpaces.push({
        idProperty: property.id,
        name: property.name,
        status: property.status,
        address: property.address,
        city: property.city,
        country: property.country,
        province: property.province,
        price: property.price,
        imageBlobURL: null
      });

      if (property.Images.length > 0) {
        const firstImage = property.Images[0];
        this.getPropertyImageUrl(firstImage.uuidImage, i);
      }
    }
  }

  getPropertyImageUrl(imageUrl: string, index: number) {
    this._accountSvc.getImages(imageUrl).subscribe({
      next: (v) => {
        const imageBlobURL = URL.createObjectURL(v);
        this.mySpaces[index].imageBlobURL = imageBlobURL;
      },
      error: (e: HttpErrorResponse) => {
        console.log(e);
      }
    });
  }

  goToMySpace(mySpace: any): void {
    console.log(mySpace);
    this._router.navigate(['account/my-spaces/', mySpace.idProperty])
  }
}
