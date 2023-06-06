import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private REST_API_URL: string = 'http://localhost:3000/';
  //private REST_API_URL: string = 'http://3.69.12.0:3000/';

  private USERS_URL = 'api/users/';
  private PROPERTIES_URL = 'api/properties/'

  constructor(
    private _http: HttpClient
  ) { }

  // USER
  getUser(userId: number): Observable<any> {

    return this._http.get(`${this.REST_API_URL}${this.USERS_URL}` + userId);
  }

  // SPACE
  getPropertiesByUser(userId: number): Observable<any> {

    return this._http.get(`${this.REST_API_URL}${this.PROPERTIES_URL}user/` + userId);
  }

  getPropertyById(propertyId: number): Observable<any> {

    return this._http.get(`${this.REST_API_URL}${this.PROPERTIES_URL}` + propertyId);
  }

  getPendingProperties(): Observable<any>{

    return this._http.get(`${this.REST_API_URL}${this.PROPERTIES_URL}pending`);
  }

  // IMAGES
  getImages(imageUrl: string) {

    return this._http.get(`${this.REST_API_URL}${this.PROPERTIES_URL}image/${imageUrl}`, { responseType: 'blob' })
  }

  // MAPS
  searchWord(query: string) {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    return this._http.get(url + query + '.json?types=address&access_token=' + environment.mapbox_key).pipe(
      map((res: any) => {
        return res.features;
      })
    )
  }
}