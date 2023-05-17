import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  //private serverURL: string = 'http://localhost:3000/';
  private serverURL: string = 'http://3.69.12.0:3000/';

  private apiURLAccountUser = 'api/account/users';

  constructor(
    private _http: HttpClient
  ) { }

}
