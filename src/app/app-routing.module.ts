import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './components/profile/profile.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';

import { AuthGuard } from './guards/signin.guard';
import { ProfileGuard } from './guards/profile.guard';
import { HomeComponent } from './components/home/home.component';
import { AccountComponent } from './components/account/account.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signin', component: SigninComponent, canActivate: [ ProfileGuard ], data: { showFooter: true } },
  { path: 'signup', component: SignupComponent },  
  { path: 'account', component: AccountComponent, canActivate: [ AuthGuard ] },
  { path: 'profile', component: ProfileComponent, canActivate: [ AuthGuard ] },
  { path: 'personal-info', component: PersonalInfoComponent, canActivate: [ AuthGuard ] },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
