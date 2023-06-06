import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLandlordComponent } from './pages/home-landlord/home-landlord.component';
import { ListingPlaceSpaceComponent } from './pages/listing-place-space/listing-place-space.component';
import { ListingDescribeSpaceComponent } from './pages/listing-describe-space/listing-describe-space.component';
import { ListingAmenitiesSpaceComponent } from './pages/listing-amenities-space/listing-amenities-space.component';
import { ListingPriceImagesSpaceComponent } from './pages/listing-price-images-space/listing-price-images-space.component';
import { ListingFinishSpaceComponent } from './pages/listing-finish-space/listing-finish-space.component';
import { ListingGuard } from './guards/listing.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeLandlordComponent
      },
      {
        path: 'place-space',
        component: ListingPlaceSpaceComponent,
        canActivate: [ ListingGuard ]
      },
      {
        path: 'place-space/:id',
        component: ListingPlaceSpaceComponent,
        canActivate: [ ListingGuard ]
      },
      {
        path: 'describe-space/:id',
        component: ListingDescribeSpaceComponent,
        canActivate: [ ListingGuard ]
      },
      {
        path: 'amenities-space/:id',
        component: ListingAmenitiesSpaceComponent,
        canActivate: [ ListingGuard ]
      },
      {
        path: 'price-images-space/:id',
        component: ListingPriceImagesSpaceComponent,
        canActivate: [ ListingGuard ]
      },
      {
        path: 'finish-listing',
        component: ListingFinishSpaceComponent,
        canActivate: [ ListingGuard ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListingRoutingModule { }
