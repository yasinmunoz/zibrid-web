import { AfterViewInit, Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountService } from '../../services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorService } from 'src/app/auth/services/error.service';
import { HttpErrorResponse } from '@angular/common/http';

import * as mapboxgl from 'mapbox-gl';

(mapboxgl as any).accessToken = 'pk.eyJ1IjoieWFzaW5tdW5veiIsImEiOiJjbDlkNjF4ZW8wMWpjM3ZwYmF0bmJsdGNzIn0.K0bcPYP7QBi9mJyD_ByQUg';

@Component({
  selector: 'app-my-space',
  templateUrl: './my-space.component.html',
  styleUrls: ['./my-space.component.css']
})
export class MySpaceComponent implements OnInit {

  id?: any;
  mySpace: any;

  coordinates: any;

  amenities: any;
  images: any[] = [];
  imageUrls: string[] = []; // Array de URLs generadas para las imágenes

  constructor(
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
        this.mySpace = v.property;
        this.amenities = v.property.amenities;
        console.log(this.mySpace);
        console.log(this.amenities);
        this.setData();
        console.log(this.imageUrls); 
        this.setMap();
      },
      error: (e: HttpErrorResponse) => {
        this._errorSvc.msgError(e);
      }
    });
  }


  setMap() {
    const address = this.mySpace.address;
    const city = this.mySpace.city;
    const province = this.mySpace.province;
    const state = this.mySpace.state;
    const country = this.mySpace.country;
    const zip = this.mySpace.zip;

    console.log(address, city, province, state, country, zip);

    this._accountSvc.searchWord(`${address}, ${city}, ${province}, ${state}, ${country}, ${zip}`).subscribe({
      next: async (v) => {
        this.coordinates = v[0].center;
                
        const map = new mapboxgl.Map({
          container: 'map', // container ID
          style: 'mapbox://styles/mapbox/outdoors-v12', // style URL
          center: this.coordinates, // starting position [lng, lat]
          zoom: 14, // starting zoom
        });
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


  editSpace(propertyId: number) {
    console.log(propertyId);
    this._router.navigate(['listing/place-space/', propertyId]);
  }


  deleteSpace(pendingSpaceId: number) {

    this._accountSvc.deleteProperty(pendingSpaceId).subscribe({
      next: (v) => {
        this._router.navigate(['account/my-spaces']);
      },
      error: (e: HttpErrorResponse) => {
        this._errorSvc.msgError(e);
      }
    })
  }
}