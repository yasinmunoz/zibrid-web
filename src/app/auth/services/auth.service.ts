import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { Landlord } from '../interfaces/landlord';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private serverURL: string;
  private apiURL: string;

  constructor(
    private _http: HttpClient
  ) {
    //this.serverURL = 'http://localhost:3000/';
    this.serverURL = 'ec2-3-69-12-0.eu-central-1.compute.amazonaws.com:3000/';
    this.apiURL = 'api/users';
  }

  signup(user: User): Observable<any> {

    return this._http.post(`${this.serverURL}${this.apiURL}/signup`, user);
  }

  signin(user: User): Observable<string> {

    return this._http.post<string>(`${this.serverURL}${this.apiURL}/signin`, user);
  }

  signupLandLord(landLordUser: Landlord): Observable<any> {

    return this._http.post(`${this.serverURL}${this.apiURL}`, landLordUser);
  }

  signinLandLord(landLordUser: Landlord): Observable<string> {

    return this._http.post<string>(`${this.serverURL}${this.apiURL}/signin`, landLordUser);
  }

}
