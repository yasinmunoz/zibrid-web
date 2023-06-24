import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PropertyPlace } from 'src/app/listing/interfaces/propertyplace';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  //private REST_API_URL: string = 'http://localhost:3000/';
  private REST_API_URL: string = 'https://d35fn2in49b4xm.cloudfront.net/';

  private PROPERTIES_URL: string = 'api/properties/';
  private AMENITIES_URL: string = 'api/amenities';

  constructor(
    private _http: HttpClient
  ) { }

  // SPACE
  getPropertyById(propertyId: number): Observable<any> {

    return this._http.get(`${this.REST_API_URL}${this.PROPERTIES_URL}` + propertyId);
  }

  createProperty(propertyPlace: PropertyPlace): Observable<any> {

    const token = localStorage.getItem("token");
    const headers = new HttpHeaders().set('authorization', `Bearer ${token}`);

    return this._http.post(`${this.REST_API_URL}${this.PROPERTIES_URL}`, propertyPlace, { headers });
  }

  editProperty(propertyId: number, propertyPlace: any): Observable<any> {

    return this._http.put(`${this.REST_API_URL}${this.PROPERTIES_URL}${propertyId}`, propertyPlace);
  }

  // IMAGES SPACE
  uploadPropertyImagesAndSetPrice(formData: FormData): Observable<any> {

    return this._http.post(`${this.REST_API_URL}${this.PROPERTIES_URL}images-price`, formData);
  }

  // AMENITIES
  getAllAmenities(): Observable<any> {

    return this._http.get(`${this.REST_API_URL}${this.AMENITIES_URL}`);
  }
}