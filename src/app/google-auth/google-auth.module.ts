import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { GoogleAuthPageComponent } from './google-auth-page/google-auth-page.component';
import { GoogleAuthRoutingModule } from './google-auth-routing.module';
import { GoogleAuthService } from './services/google-auth.service';
import { OAuthModule } from 'angular-oauth2-oidc';



@NgModule({
  declarations: [    
    GoogleAuthPageComponent
  ],
  imports: [
    GoogleAuthRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    CommonModule,    
    SharedModule,
    OAuthModule.forRoot()
  ],
  providers: [
    GoogleAuthService
  ],
})
export class GoogleAuthModule { }
