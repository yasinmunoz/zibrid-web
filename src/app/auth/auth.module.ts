import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupGuestComponent } from './pages/signup-guest/signup-guest.component';
import { SignupLandlordComponent } from './pages/signup-landlord/signup-landlord.component';
import { FormsModule } from '@angular/forms';
import { ErrorService } from './services/error.service';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [
    SigninComponent,
    SignupGuestComponent,
    SignupLandlordComponent
  ],
  imports: [
    AuthRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,    
    SharedModule,
    
  ],
  providers: [
    ErrorService,
    UserService
  ],
})
export class AuthModule { }
