import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BookingService } from '../../services/booking.service';
import { ErrorService } from 'src/app/auth/services/error.service';

@Component({
  selector: 'app-home-guest',
  templateUrl: './home-guest.component.html',
  styleUrls: ['./home-guest.component.css']
})
export class HomeGuestComponent {

  constructor(
    private _router: Router,
    private _jwtHelperSvc: JwtHelperService,
    private _bookingSvc: BookingService,
    private _errorSvc: ErrorService
  ) { }


  findSpaces() {
    this._router.navigate(['/booking/show-apartments']);
  }
}
