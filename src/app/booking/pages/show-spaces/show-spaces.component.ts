import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { ErrorService } from 'src/app/auth/services/error.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-show-spaces',
  templateUrl: './show-spaces.component.html',
  styleUrls: ['./show-spaces.component.css']
})
export class ShowSpacesComponent {

  currentTab: string = 'apartments';

  location?: any;
  spaces: any[] = [];

  properties!: any[];
  images: any[] = [];
  imageUrls: string[] = []; // Array de URLs generadas para las imágenes    

  constructor(
    private _bookingSvc: BookingService,
    private _errorSvc: ErrorService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.location = this._activatedRoute.snapshot.paramMap.get('id');
    this.inicializate();
  }

  async inicializate() {

    this.getApartmentsByLocation(this.currentTab);
  }

  // Preparo los datos que voy a mostrar salvo la imageBlobURL
  setData() {
    this.spaces = [];

    for (let i = 0; i < this.properties.length; i++) {
      const property = this.properties[i];
      console.log(property.Images.length);

      this.spaces.push({
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
    this._bookingSvc.getImages(imageUrl).subscribe({
      next: (v) => {
        const imageBlobURL = URL.createObjectURL(v);
        this.spaces[index].imageBlobURL = imageBlobURL;
      },
      error: (e: HttpErrorResponse) => {
        console.log(e);
      }
    });
  }

  goToSpace(mySpace: any): void {
    console.log(mySpace);
    this._router.navigate(['booking/show-space/', mySpace.idProperty])
  }

  getApartmentsByLocation(tab: string) {
    this.currentTab = tab;

    this._bookingSvc.getApartmentsByLocation(this.location).subscribe({
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

  getHousesByLocation(tab: string) {
    this.currentTab = tab;

    this._bookingSvc.getHousesByLocation(this.location).subscribe({
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

  getCoworkingsByLocation(tab: string) {
    this.currentTab = tab;

    this._bookingSvc.getCoworkingsByLocation(this.location).subscribe({
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

  getColivingsByLocation(tab: string) {
    this.currentTab = tab;
    
    this._bookingSvc.getColivingsByLocation(this.location).subscribe({
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
}
