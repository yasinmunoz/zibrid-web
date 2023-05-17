import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listing-finish-space',
  templateUrl: './listing-finish-space.component.html',
  styleUrls: ['./listing-finish-space.component.css']
})
export class ListingFinishSpaceComponent {

  constructor(
    private _router: Router,
  ){}

  goToAccount () {
    this._router.navigate(['/account']);
  }

}
