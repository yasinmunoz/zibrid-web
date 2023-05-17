import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeGuestComponent } from './pages/home-guest/home-guest.component';
import { ShowSpacesComponent } from './pages/show-spaces/show-spaces.component';
import { DetailSpaceComponent } from './pages/detail-space/detail-space.component';

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
        path: 'detail-space',
        component: DetailSpaceComponent
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
