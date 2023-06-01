import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';

import { HomeGuestComponent } from './pages/home-guest/home-guest.component';
import { SharedModule } from '../shared/shared.module';
import { ShowSpacesComponent } from './pages/show-spaces/show-spaces.component';
import { ShowApartmentsComponent } from './pages/show-apartments/show-apartments.component';
import { ShowHousesComponent } from './pages/show-houses/show-houses.component';
import { ShowCoworkingsComponent } from './pages/show-coworkings/show-coworkings.component';
import { ShowColivingsComponent } from './pages/show-colivings/show-colivings.component';
import { ShowHouseComponent } from './pages/show-house/show-house.component';
import { ShowColivingComponent } from './pages/show-coliving/show-coliving.component';
import { ShowCoworkingComponent } from './pages/show-coworking/show-coworking.component';
import { ShowApartmentComponent } from './pages/show-apartment/show-apartment.component';
import { ConfirmBookingComponent } from './pages/confirm-booking/confirm-booking.component';


@NgModule({
  declarations: [
    HomeGuestComponent,
    ShowSpacesComponent,    
    ShowApartmentsComponent,
    ShowHousesComponent,
    ShowCoworkingsComponent,
    ShowColivingsComponent,
    ShowApartmentComponent,
    ShowHouseComponent,
    ShowColivingComponent,
    ShowCoworkingComponent,
    ConfirmBookingComponent
  ],
  imports: [
    BookingRoutingModule,
    CommonModule,    
    SharedModule
  ]
})
export class BookingModule { }
