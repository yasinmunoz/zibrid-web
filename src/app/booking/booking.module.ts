import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';

import { HomeGuestComponent } from './pages/home-guest/home-guest.component';
import { SharedModule } from '../shared/shared.module';
import { ShowSpacesComponent } from './pages/show-spaces/show-spaces.component';
import { DetailSpaceComponent } from './pages/detail-space/detail-space.component';


@NgModule({
  declarations: [
    HomeGuestComponent,
    ShowSpacesComponent,
    DetailSpaceComponent
  ],
  imports: [
    BookingRoutingModule,
    CommonModule,    
    SharedModule
  ]
})
export class BookingModule { }
