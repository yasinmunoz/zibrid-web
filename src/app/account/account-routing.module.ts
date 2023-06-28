import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './pages/account/account.component';
import { MySpacesComponent } from './pages/my-spaces/my-spaces.component';
import { MyBookingsComponent } from './pages/my-bookings/my-bookings.component';
import { PendingSpacesComponent } from './pages/pending-spaces/pending-spaces.component';
import { MySpaceComponent } from './pages/my-space/my-space.component';
import { PendingSpaceComponent } from './pages/pending-space/pending-space.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AccountComponent
      },
      {
        path: 'my-spaces',
        component: MySpacesComponent
      },
      {
        path: 'my-spaces/:id',
        component: MySpaceComponent
      },
      {
        path: 'pending-spaces',
        component: PendingSpacesComponent
      },
      {
        path: 'pending-space/:id',
        component: PendingSpaceComponent
      },
      {
        path: 'my-bookings',
        component: MyBookingsComponent
      },
      {
        path: '**',
        redirectTo: 'account'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
