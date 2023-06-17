import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BookingService } from '../../services/booking.service';
import { ErrorService } from 'src/app/auth/services/error.service';
import { Booking } from '../../interfaces/booking';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-confirm-booking',
  templateUrl: './confirm-booking.component.html',
  styleUrls: ['./confirm-booking.component.css']
})
export class ConfirmBookingComponent implements OnInit {

  space: any;
  bookingDates: string = '';

  booking: any;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _bookingSvc: BookingService,
    private _errorSvc: ErrorService
  ) { }

  ngOnInit(): void {

    this.inicializate();
  }

  async inicializate() {

    const storedBooking = localStorage.getItem('zibrid_booking');
    if (storedBooking) {
      this.booking = JSON.parse(storedBooking) as Booking;
    }
    console.log(this.booking);
    this.bookingDates = `${this.booking?.startDate} - ${this.booking?.endDate}`;

    this._bookingSvc.getPropertyById(this.booking.propertyId).subscribe({
      next: async (v) => {
        this.space = v.property;
        console.log(this.space, 'Este es mi espacio');
      },
      error: (e: HttpErrorResponse) => {
        this._errorSvc.msgError(e);
      }
    });

  }

  getBookingDays() {

    const startDate = new Date(this.booking.bookingDates[0]);
    const endDate = new Date(this.booking.bookingDates[1]);

    // Calculate the difference in milliseconds between the two dates
    const bookingMiliseconds = endDate.getTime() - startDate.getTime();

    // Convert the difference in milliseconds to days
    const bookingDays = Math.floor(bookingMiliseconds / (1000 * 60 * 60 * 24));

    return bookingDays;
  }

  confirmBook() {
    localStorage.removeItem('zibrid_booking');
    this._router.navigate(['/account']);
  }

  cancelBooking() {

    localStorage.removeItem('zibrid_booking');
    this._router.navigate(['/booking/show-space', this.booking.propertyId]);
  }

}
