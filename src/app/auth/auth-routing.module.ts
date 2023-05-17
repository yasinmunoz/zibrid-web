import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigninComponent } from './pages/signin/signin.component';
import { SignupGuestComponent } from './pages/signup-guest/signup-guest.component';
import { SignupLandlordComponent } from './pages/signup-landlord/signup-landlord.component';
import { SigninGuard } from './guards/signin.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'signin', 
        component: SigninComponent,
        canActivate: [ SigninGuard ], 
        data: { showFooter: true }
      },
      {
        path: 'signup/guest',
        component: SignupGuestComponent
      },
      {
        path: 'signup/landlord',
        component: SignupLandlordComponent
      },
      {
        path: '**',
        redirectTo: 'signin'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
