import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorService } from 'src/app/auth/services/error.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ListingService } from 'src/app/listing/services/listing.service';

@Component({
  selector: 'app-edit-my-space',
  templateUrl: './edit-my-space.component.html',
  styleUrls: ['./edit-my-space.component.css']
})
export class EditMySpaceComponent implements OnInit {

  propertyId?: any;
  mySpace: any;
  allAmenities: any;
  amenitiesProperty: any[] = [];

  amenitiesPropertyNames: any[] = [];

  editMySpace: string = '';

  images: any[] = [];
  imageUrls: string[] = []; // Array de URLs generadas para las imágenes
  
  constructor(
    private _accountSvc: AccountService,
    private _activatedRoute: ActivatedRoute,
    private _listingSvc: ListingService,
    private _errorSvc: ErrorService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.propertyId = this._activatedRoute.snapshot.paramMap.get('id');
    console.log(history.state.data);
    this.editMySpace = history.state.data;
    this.inicializate();
  }

  async inicializate() {

    this._accountSvc.getPropertyById(this.propertyId).subscribe({
      next: async (v) => {
        this.mySpace = v.property;

        this.amenitiesPropertyNames = this.mySpace.amenities.map((amenity: { name: any; }) => amenity.name);
        this.amenitiesProperty = this.mySpace.amenities;

        this.setData();

        console.log(this.mySpace);
      },
      error: (e: HttpErrorResponse) => {
        this._errorSvc.msgError(e);
      }
    });

    this._listingSvc.getAllAmenities().subscribe({
      next: (v) => {
        console.log(v);
        this.allAmenities = v.data.allAmenities;
        console.log(this.allAmenities);
      },
      error: (e: HttpErrorResponse) => {
        this._errorSvc.msgError(e);
      }
    });
  }

  // Preparo los datos que voy a mostrar salvo la imageBlobURL
  setData() {
    console.log(this.mySpace.images);
    if (this.mySpace.images.length > 0) {
      for (let i = 0; i < this.mySpace.images.length; i++) {
        const image = this.mySpace.images[i];
        this.getPropertyImageUrl(image.uuidImage);
      }
    }
  }


  getPropertyImageUrl(imageUrl: string) {
    this._accountSvc.getImages(imageUrl).subscribe({
      next: (v) => {
        const imageBlobURL = URL.createObjectURL(v);
        this.imageUrls.push(imageBlobURL);
      },
      error: (e: HttpErrorResponse) => {
        console.log(e);
      }
    });
  }


  toggleAmenitySelection(amenity: any, event: any) {

    const amenityName = amenity.name;

    if (event.target.checked) {
      this.amenitiesProperty.push(amenity);
    } else {
      const index = this.amenitiesProperty.findIndex(a => a.name === amenityName);
      if (index !== -1) {
        this.amenitiesProperty.splice(index, 1);
      }
    }

    this.mySpace.amenities = this.amenitiesProperty;
  }

  increaseBeds() {
    this.mySpace.beds += 1;
  }

  decreaseBeds() {
    this.mySpace.beds -= 1;
    if (this.mySpace.beds < 0) this.mySpace.beds = 0;
  }

  increaseBedrooms() {
    this.mySpace.bedrooms += 1;
  }

  decreaseBedrooms() {
    this.mySpace.bedrooms -= 1;
    if (this.mySpace.bedrooms < 0) this.mySpace.bedrooms = 0;
  }

  increaseBathrooms() {
    this.mySpace.bathrooms += 1;
  }

  decreaseBathrooms() {
    this.mySpace.bathrooms -= 1;
    if (this.mySpace.bathrooms < 0) this.mySpace.bathrooms = 0;
  }

  increaseWorkspaces() {
    this.mySpace.workspaces += 1;
  }

  decreaseWorkspaces() {
    this.mySpace.workspaces -= 1;
    if (this.mySpace.workspaces < 0) this.mySpace.workspaces = 0;
  }

  back() {
    if (this.editMySpace == 'edit-pending-space') this._router.navigate(['/account/pending-spaces']);
  }

  editSpace(){
    
    this._listingSvc.editProperty(this.propertyId, this.mySpace).subscribe({

      next: (v) => {
        console.log(v);
        if (this.editMySpace == 'edit-pending-space') {
          this._router.navigate(['/account/pending-spaces']);
        } else {
          this._router.navigate(['/account/my-spaces'])
        }   
      },
      error: (e: HttpErrorResponse) => {
        this._errorSvc.msgError(e);
      }
    });
  }
}
