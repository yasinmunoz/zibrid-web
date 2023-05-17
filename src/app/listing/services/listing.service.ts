import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PropertyPlace } from 'src/app/listing/interfaces/propertyplace';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  private serverURL: string;

  // Space URL
  private apiURLSpace: string;

  // Place Space URLs
  private apiURLPlaceSpace: string;

  // Description Space URLs
  private apiURLDescriptionSpace: string;

  // Amenities Space URLs
  private apiURLAmenitiesSpace: string;

  // Price-Image Space URLs
  private apiURLPriceImageSpace: string;

  constructor(
    private _http: HttpClient
  ) {
    //this.serverURL = 'http://localhost:3000/';
    this.serverURL = 'http://3.69.12.0:3000/';

    // Space URL
    this.apiURLSpace = 'api/listing/space'

    // Place Space URLs    
    this.apiURLPlaceSpace = 'api/listing/place-space';

    // Description Space URLs
    this.apiURLDescriptionSpace = 'api/listing/describe-space';
    
    // Amenities Space URLs
    this.apiURLAmenitiesSpace = 'api/listing/amenities-space';

    // Price-Image Space URLs
    this.apiURLPriceImageSpace = 'api/listing/price-images-space';

  }

  //PLACE SPACE
  createPlaceSpace(propertyPlace: PropertyPlace): Observable<any> {

    const token = localStorage.getItem("token");
    const headers = new HttpHeaders().set('authorization', `Bearer ${token}`);
    console.log(propertyPlace);
    return this._http.post(`${this.serverURL}${this.apiURLPlaceSpace}`, propertyPlace, { headers });
  }

  getSpace(propertyId: number): Observable<any> {

    return this._http.get(`${this.serverURL}${this.apiURLSpace}/` + propertyId);
  }

  editPlaceSpace(propertyId: number, propertyPlace: any): Observable<any> {

    return this._http.put(`${this.serverURL}${this.apiURLPlaceSpace}/${propertyId}`, propertyPlace);
  }


  // DESCRIPTION SPACE
  getDescriptionSpace(propertyId: number): Observable<any> {

    return this._http.get(`${this.serverURL}${this.apiURLDescriptionSpace}/` + propertyId);
  }

  editDescriptionSpace(propertyId: number, descriptionSpace: any): Observable<any> {

    return this._http.put(`${this.serverURL}${this.apiURLDescriptionSpace}/${propertyId}`, descriptionSpace);
  }


  // AMENITIES SPACE
  getAllAmenities (): Observable<any> {

    return this._http.get(`${this.serverURL}${this.apiURLAmenitiesSpace}`);
  }

  getAmenitiesSpace(propertyId: number): Observable<any> {

    return this._http.get(`${this.serverURL}${this.apiURLAmenitiesSpace}/` + propertyId);
  }

  editAmenitiesSpace(propertyId: number, amenitiesSpace: any): Observable<any> {

    return this._http.put(`${this.serverURL}${this.apiURLAmenitiesSpace}/${propertyId}`, amenitiesSpace);
  }


  // IMAGES-PRICE SPACE
  createImages(formData: FormData): Observable<any> {

    return this._http.post(`${this.serverURL}${this.apiURLPriceImageSpace}`, formData);
  }
}
