import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private serverURL: string = 'http://localhost:3000/';
  //private serverURL: string = 'http://3.69.12.0:3000/';

  private apiURLAccountUser = 'api/account/users';

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

}
