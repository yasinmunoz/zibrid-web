import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  //private REST_API_URL: string = 'http://localhost:3000/';
  private REST_API_URL: string = 'ec2-3-69-12-0.eu-central-1.compute.amazonaws.com:3000/';

  private USERS_URL = 'api/users/';
  private PROPERTIES_URL = 'api/properties/'

  constructor(
    private _http: HttpClient
  ) { }

  searchWord(query: string) {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    return this._http.get(url + query + '.json?types=address&access_token=' + environment.mapbox_key).pipe(
      map((res: any) => {
        console.log(res);
        return res.features;
      })
    )
  }

  getPropertyLocations(): Observable<any> {

    return this._http.get(`${this.REST_API_URL}${this.PROPERTIES_URL}locations`);
  }

  // IMAGES
  getImages(imageUrl: string): Observable<any> {

    return this._http.get(`${this.REST_API_URL}${this.PROPERTIES_URL}image/${imageUrl}`, { responseType: 'blob' })
  }

  // SPACES
  getApartmentsByLocation(location: string): Observable<any> {

    return this._http.get(`${this.REST_API_URL}${this.PROPERTIES_URL}apartments/${location}`);
  }

  getHousesByLocation(location: string): Observable<any> {

    return this._http.get(`${this.REST_API_URL}${this.PROPERTIES_URL}houses/${location}`);
  }

  getCoworkingsByLocation(location: string): Observable<any> {

    return this._http.get(`${this.REST_API_URL}${this.PROPERTIES_URL}coworkings/${location}`);
  }

  getColivingsByLocation(location: string): Observable<any> {

    return this._http.get(`${this.REST_API_URL}${this.PROPERTIES_URL}colivings/${location}`);
  }

  getPropertyById(propertyId: number): Observable<any> {

    return this._http.get(`${this.REST_API_URL}${this.PROPERTIES_URL}` + propertyId);
  }
}
