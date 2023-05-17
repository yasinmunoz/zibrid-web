import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './pages/account/account.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PersonalInfoComponent } from './pages/personal-info/personal-info.component';
import { SharedModule } from '../shared/shared.module';
import { MySpacesComponent } from './pages/my-spaces/my-spaces.component';
import { MyBookingsComponent } from './pages/my-bookings/my-bookings.component';
import { PendingSpacesComponent } from './pages/pending-spaces/pending-spaces.component';


@NgModule({
  declarations: [
    AccountComponent,
    ProfileComponent,
    PersonalInfoComponent,
    MySpacesComponent,
    MyBookingsComponent,
    PendingSpacesComponent
  ],
  imports: [
    AccountRoutingModule,
    CommonModule,    
    SharedModule,
  ]
})
export class AccountModule { }
