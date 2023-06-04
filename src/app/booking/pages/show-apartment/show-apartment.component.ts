import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BookingService } from '../../services/booking.service';
import { ErrorService } from 'src/app/auth/services/error.service';
import * as mapboxgl from 'mapbox-gl';
import { HttpErrorResponse } from '@angular/common/http';

(mapboxgl as any).accessToken = 'pk.eyJ1IjoieWFzaW5tdW5veiIsImEiOiJjbDlkNjF4ZW8wMWpjM3ZwYmF0bmJsdGNzIn0.K0bcPYP7QBi9mJyD_ByQUg';

@Component({
  selector: 'app-show-apartment',
  templateUrl: './show-apartment.component.html',
  styleUrls: ['./show-apartment.component.css']
})
export class ShowApartmentComponent implements AfterViewInit {

  previousUrl: string = '';

  constructor(
    private _router: Router,
    private _jwtHelperSvc: JwtHelperService,
    private _bookingSvc: BookingService,
    private _errorSvc: ErrorService
  ) { }

  ngAfterViewInit(): void {
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/outdoors-v12', // style URL
      center: [-1.861735, 39.002274], // starting position [lng, lat]
      zoom: 14, // starting zoom
    });
  }

  bookSpace() {

    const token = localStorage.getItem('token');

    if (token) this._router.navigate(['/booking/confirm-booking']);
    else this._router.navigate(['/auth/login'], { state: { data: 'show-apartment' } });

  }

  getCoordinates() {
    this._bookingSvc.searchWord('Calle Gabriel Ciscar, 26, Albacete').subscribe({
      next: async (v) => {
        console.log(v);
      },
      error: (e: HttpErrorResponse) => {
        this._errorSvc.msgError(e);
      }
    });
  }

}
