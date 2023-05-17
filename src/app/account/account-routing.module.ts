import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './pages/account/account.component';
import { PersonalInfoComponent } from './pages/personal-info/personal-info.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MySpacesComponent } from './pages/my-spaces/my-spaces.component';
import { MyBookingsComponent } from './pages/my-bookings/my-bookings.component';
import { PendingSpacesComponent } from './pages/pending-spaces/pending-spaces.component';

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
        path: 'pending-spaces',
        component: PendingSpacesComponent
      },
      {
        path: 'my-bookings',
        component: MyBookingsComponent
      },
      {
        path: 'personal-info',
        component: PersonalInfoComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
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
