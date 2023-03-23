import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private serverURL: string;
  private apiURL: string;

  constructor(
    private _http: HttpClient
  ) {
    //this.serverURL = 'http://localhost:3000/';
    this.serverURL = 'http://3.69.12.0:3000/';
    this.apiURL = 'api/users'
  }

  signup(user: User): Observable<any> {

    return this._http.post(`${this.serverURL}${this.apiURL}`, user);
  }

  signin(user: User): Observable<string> {

    return this._http.post<string>(`${this.serverURL}${this.apiURL}/signin`, user);
  }

}
