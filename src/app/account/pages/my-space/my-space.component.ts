import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountService } from '../../services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorService } from 'src/app/auth/services/error.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-my-space',
  templateUrl: './my-space.component.html',
  styleUrls: ['./my-space.component.css']
})
export class MySpaceComponent implements OnInit {

  id?: any;
  mySpace: any;
  amenities: any;
  images: any[] = [];
  imageUrls: string[] = []; // Array de URLs generadas para las imágenes

  constructor(
    private _jwtHelperSvc: JwtHelperService,
    private _accountSvc: AccountService,
    private _activatedRoute: ActivatedRoute,
    private _errorSvc: ErrorService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.paramMap.get('id');
    this.inicializate();
  }

  async inicializate() {

    this._accountSvc.getPropertyById(this.id).subscribe({
      next: async (v) => {
        this.mySpace = v.space;
        this.amenities = v.space.amenities;
        console.log(this.mySpace);
        console.log(this.amenities);
        this.setData();
        console.log(this.imageUrls);
      },
      error: (e: HttpErrorResponse) => {
        this._errorSvc.msgError(e);
      }
    });
  }

  // Preparo los datos que voy a mostrar salvo la imageBlobURL
  setData() {

    console.log(this.mySpace.images);
    if (this.mySpace.images.length > 0) {
      for (let i = 0; i < this.mySpace.images.length; i++) {
        const image = this.mySpace.images[i];
        this.getPropertyImageUrl(image.uuidImage);
      }
    }
    

  }


  getPropertyImageUrl(imageUrl: string) {
    this._accountSvc.getImages(imageUrl).subscribe({
      next: (v) => {
        const imageBlobURL = URL.createObjectURL(v);
        this.imageUrls.push(imageBlobURL);
      },
      error: (e: HttpErrorResponse) => {
        console.log(e);
      }
    });
  }

}