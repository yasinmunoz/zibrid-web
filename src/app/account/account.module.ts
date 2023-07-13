import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './pages/account/account.component';
import { SharedModule } from '../shared/shared.module';
import { MySpacesComponent } from './pages/my-spaces/my-spaces.component';
import { PendingSpacesComponent } from './pages/pending-spaces/pending-spaces.component';
import { MySpaceComponent } from './pages/my-space/my-space.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FormsModule } from '@angular/forms';
import { EditMySpaceComponent } from './pages/edit-my-space/edit-my-space.component';


@NgModule({
  declarations: [
    AccountComponent,
    MySpacesComponent,    
    PendingSpacesComponent,
    MySpaceComponent,
    EditMySpaceComponent
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
