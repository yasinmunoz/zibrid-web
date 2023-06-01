import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeGuestComponent } from './pages/home-guest/home-guest.component';
import { ShowSpacesComponent } from './pages/show-spaces/show-spaces.component';
import { ShowApartmentsComponent } from './pages/show-apartments/show-apartments.component';
import { ShowHousesComponent } from './pages/show-houses/show-houses.component';
import { ShowColivingsComponent } from './pages/show-colivings/show-colivings.component';
import { ShowCoworkingsComponent } from './pages/show-coworkings/show-coworkings.component';
import { ShowApartmentComponent } from './pages/show-apartment/show-apartment.component';
import { ShowHouseComponent } from './pages/show-house/show-house.component';
import { ShowColivingComponent } from './pages/show-coliving/show-coliving.component';
import { ShowCoworkingComponent } from './pages/show-coworking/show-coworking.component';
import { ConfirmBookingComponent } from './pages/confirm-booking/confirm-booking.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeGuestComponent
      },
      {
        path: 'show-spaces',
        component: ShowSpacesComponent
      },
      {
        path: 'show-apartments',
        component: ShowApartmentsComponent
      },
      {
        path: 'show-apartment',
        component: ShowApartmentComponent
      },
      {
        path: 'show-houses',
        component: ShowHousesComponent
      },
      {
        path: 'show-house',
        component: ShowHouseComponent
      },
      {
        path: 'show-colivings',
        component: ShowColivingsComponent
      },
      {
        path: 'show-coliving',
        component: ShowColivingComponent
      },      
      {
        path: 'show-coworkings',
        component: ShowCoworkingsComponent
      },
      {
        path: 'show-coworking',
        component: ShowCoworkingComponent
      },
      {
        path: 'confirm-booking',
        component: ConfirmBookingComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
