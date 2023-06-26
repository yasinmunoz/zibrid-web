import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';

import { HomeGuestComponent } from './pages/home-guest/home-guest.component';
import { SharedModule } from '../shared/shared.module';
import { ShowSpacesComponent } from './pages/show-spaces/show-spaces.component';
import { ShowSpaceComponent } from './pages/show-space/show-space.component';
import { ConfirmBookingComponent } from './pages/confirm-booking/confirm-booking.component';

import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
defineLocale('es', esLocale);

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FormsModule } from '@angular/forms';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    HomeGuestComponent,
    ShowSpacesComponent,
    ShowSpaceComponent,
    ConfirmBookingComponent,
  ],
  imports: [    
    BookingRoutingModule,
    NgbTypeaheadModule,
    CommonModule,
    FormsModule,
    SharedModule,
    TooltipModule.forRoot(),
    BsDatepickerModule.forRoot(),
  ]
})
export class BookingModule {
  constructor(private bsLocaleService: BsLocaleService) {
    this.bsLocaleService.use('es');//fecha en español, datepicker
  }
}
