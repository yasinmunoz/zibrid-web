import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private serverURL: string = 'http://localhost:3000/';
  //private serverURL: string = 'http://3.69.12.0:3000/';

  private apiURLAccountUser = 'api/account';
  private apiURLProperty = 'api/property'

  constructor(
    private _http: HttpClient
  ) { }

  getUser(userId: number): Observable<any> {

    return this._http.get(`${this.serverURL}${this.apiURLAccountUser}/users/` + userId);
  }

  getPropertiesByUser(userId: number): Observable<any>{
    
    return this._http.get(`${this.serverURL}${this.apiURLProperty}/user/` + userId);
  }

  getPropertyById(propertyId: number): Observable<any>{

    return this._http.get(`${this.serverURL}${this.apiURLProperty}/` + propertyId);
  }

  getImages(imageUrl: string){
    return this._http.get(`${this.serverURL}${this.apiURLProperty}/image/${imageUrl}`, { responseType: 'blob' })
  }

}
