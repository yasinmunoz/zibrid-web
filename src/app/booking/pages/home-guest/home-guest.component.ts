import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BookingService } from '../../services/booking.service';
import { ErrorService } from 'src/app/auth/services/error.service';
import { HttpErrorResponse } from '@angular/common/http';
import { OperatorFunction, Observable, map, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-home-guest',
  templateUrl: './home-guest.component.html',
  styleUrls: ['./home-guest.component.css']
})
export class HomeGuestComponent {

  locations: any[] = [];
  public model: any;

  formatter = (result: string) => result.toUpperCase();

  constructor(
    private _router: Router,
    private _jwtHelperSvc: JwtHelperService,
    private _bookingSvc: BookingService,
    private _errorSvc: ErrorService
  ) { }

  ngOnInit(): void {

    this.inicializate();
  }

  async inicializate() {

    this._bookingSvc.getPropertyLocations().subscribe({
      next: async (v) => {
        this.locations = v.data;
        console.log(this.locations);
      },
      error: (e: HttpErrorResponse) => {
        this._errorSvc.msgError(e);
      }
    });
  }

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      map((term: any) =>
        term === '' ? [] : this.locations.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
      ),
    );

  findSpaces(location: string) {

    this._router.navigate(['/booking/show-spaces', location]);
  }
}
