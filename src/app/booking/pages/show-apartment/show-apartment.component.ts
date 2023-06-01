import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BookingService } from '../../services/booking.service';
import { ErrorService } from 'src/app/auth/services/error.service';

@Component({
  selector: 'app-show-apartment',
  templateUrl: './show-apartment.component.html',
  styleUrls: ['./show-apartment.component.css']
})
export class ShowApartmentComponent {

  previousUrl: string = '';

  constructor(
    private _router: Router,
    private _jwtHelperSvc: JwtHelperService,
    private _bookingSvc: BookingService,
    private _errorSvc: ErrorService
  ) { }

  bookSpace() {

    const token = localStorage.getItem('token');
    
    if (token) this._router.navigate(['/booking/confirm-booking']);
    else this._router.navigate(['/auth/login'], { state: { data: 'show-apartment' } });

  }
}
