import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeGuestComponent } from './pages/home-guest/home-guest.component';
import { ShowSpacesComponent } from './pages/show-spaces/show-spaces.component';
import { ShowSpaceComponent } from './pages/show-space/show-space.component';
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
        path: 'show-spaces/:id',
        component: ShowSpacesComponent
      },
      {
        path: 'show-space/:id',
        component: ShowSpaceComponent
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
