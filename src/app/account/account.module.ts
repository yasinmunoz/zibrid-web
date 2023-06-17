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
import { MySpaceComponent } from './pages/my-space/my-space.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FormsModule } from '@angular/forms';
import { PendingSpaceComponent } from './pages/pending-space/pending-space.component';


@NgModule({
  declarations: [
    AccountComponent,
    ProfileComponent,
    PersonalInfoComponent,
    MySpacesComponent,
    MyBookingsComponent,
    PendingSpacesComponent,
    MySpaceComponent,
    PendingSpaceComponent
  ],
  imports: [
    AccountRoutingModule,
    CommonModule,    
    SharedModule,
    FormsModule,
    CarouselModule.forRoot()
  ]
})
export class AccountModule { }
