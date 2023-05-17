import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListingRoutingModule } from './listing-routing.module';
import { HomeLandlordComponent } from './pages/home-landlord/home-landlord.component';
import { SharedModule } from '../shared/shared.module';
import { ListingPlaceSpaceComponent } from './pages/listing-place-space/listing-place-space.component';
import { ListingDescribeSpaceComponent } from './pages/listing-describe-space/listing-describe-space.component';
import { ListingAmenitiesSpaceComponent } from './pages/listing-amenities-space/listing-amenities-space.component';
import { ListingPriceImagesSpaceComponent } from './pages/listing-price-images-space/listing-price-images-space.component';
import { ListingFinishSpaceComponent } from './pages/listing-finish-space/listing-finish-space.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomeLandlordComponent,
    ListingPlaceSpaceComponent,
    ListingDescribeSpaceComponent,
    ListingAmenitiesSpaceComponent,
    ListingPriceImagesSpaceComponent,
    ListingFinishSpaceComponent    
  ],
  imports: [
    ListingRoutingModule,
    CommonModule,
    FormsModule,
    NgxDropzoneModule,    
    SharedModule
  ]
})
export class ListingModule { }
