import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { ErrorService } from 'src/app/auth/services/error.service';
import * as mapboxgl from 'mapbox-gl';
import { HttpErrorResponse } from '@angular/common/http';
import { Booking } from '../../interfaces/booking';
import { JwtHelperService } from '@auth0/angular-jwt';

(mapboxgl as any).accessToken = 'pk.eyJ1IjoieWFzaW5tdW5veiIsImEiOiJjbDlkNjF4ZW8wMWpjM3ZwYmF0bmJsdGNzIn0.K0bcPYP7QBi9mJyD_ByQUg';

@Component({
  selector: 'app-show-space',
  templateUrl: './show-space.component.html',
  styleUrls: ['./show-space.component.css']
})
export class ShowSpaceComponent implements OnInit {

  id?: any;
  space: any;
  bookingDates: Date[] = [];
  serviceFee: number = 0.02;
  user: any;

  coordinates: any;

  amenities: any;

  lifeAmenities: any [] = [];
  workAmenities: any [] = [];

  images: any[] = [];
  imageUrls: string[] = []; // Array de URLs generadas para las imágenes

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _jwtHelperSvc: JwtHelperService,
    private _bookingSvc: BookingService,
    private _errorSvc: ErrorService
  ) {
    const token = localStorage.getItem("token");
    if (token) {
      this.user = this._jwtHelperSvc.decodeToken(token);
    }
  }

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.paramMap.get('id');
    this.inicializate();
  }

  async inicializate() {    

    this._bookingSvc.getPropertyById(this.id).subscribe({
      next: async (v) => {
        this.space = v.property;
        this.amenities = v.property.amenities;

        for (let i = 0; i < this.amenities.length; i++) {
          let amenity = this.amenities[i];
          if (amenity.type === 'life') {
            this.lifeAmenities.push(amenity);
          } else if (amenity.type === 'work') {
            this.workAmenities.push(amenity);
          }
        }

        console.log(this.space);        
        this.setData();        
        this.setMap();
      },
      error: (e: HttpErrorResponse) => {
        this._errorSvc.msgError(e);
      }
    });
  }

  setMap() {
    const address = this.space.address;
    const city = this.space.city;
    const province = this.space.province;
    const state = this.space.state;
    const country = this.space.country;
    const zip = this.space.zip;

    console.log(address, zip + city, province, country);

    this._bookingSvc.searchWord(`${address}, ${zip} ${city}, ${province}, ${country}`).subscribe({
      next: async (v) => {
        this.coordinates = v[0].center;

        console.log(v, 'hola');

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
    console.log(this.space.images);
    if (this.space.images.length > 0) {
      for (let i = 0; i < this.space.images.length; i++) {
        const image = this.space.images[i];
        this.getPropertyImageUrl(image.uuidImage);
      }
    }
  }


  getPropertyImageUrl(imageUrl: string) {
    this._bookingSvc.getImages(imageUrl).subscribe({
      next: (v) => {
        const imageBlobURL = URL.createObjectURL(v);
        this.imageUrls.push(imageBlobURL);
      },
      error: (e: HttpErrorResponse) => {
        console.log(e);
      }
    });
  }

  bookSpace() {
    const booking: any = {
      propertyId: this.space.propertyId,      
      bookingDates: this.bookingDates,
      startDate: this.formatDate(this.bookingDates[0]),
      endDate: this.formatDate(this.bookingDates[1]),
      bookingPrice: this.getBookingPrice(),
      serviceFee: this.getServiceFee(),
      serviceFeePrice: this.getServiceFeePrice(),
      totalPrice: this.getBookingTotalPrice(),
      status: 'Pending'
    };

    localStorage.setItem('zibrid_booking', JSON.stringify(booking));

    const token = localStorage.getItem('token');

    if (token) {
      this._router.navigate(['/booking/confirm-booking']);
    }
    else {
      this._router.navigate(['/auth/login'], { state: { data: 'show-space' } });
    }
  }

  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());

    return `${day}/${month}/${year}`;
  }

  getBookingDays() {

    const startDate = new Date(this.bookingDates[0]);
    const endDate = new Date(this.bookingDates[1]);

    // Calculate the difference in milliseconds between the two dates
    const bookingMiliseconds = endDate.getTime() - startDate.getTime();

    // Convert the difference in milliseconds to days
    const bookingDays = Math.floor(bookingMiliseconds / (1000 * 60 * 60 * 24));

    return bookingDays;
  }

  getBookingPrice() {
    return this.getBookingDays() * this.space.price;
  }

  getServiceFee() {
    return this.serviceFee * 100;
  }

  getServiceFeePrice() {
    return this.getBookingPrice() * this.serviceFee;
  }

  getBookingTotalPrice() {
    return this.getBookingPrice() + this.getServiceFeePrice();
  }

  bookingDatesConfirm() {
    console.log(this.bookingDates);
  }
}