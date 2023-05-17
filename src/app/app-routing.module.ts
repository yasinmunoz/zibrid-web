import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountGuard } from './account/guards/account.guard';
import { ListingGuard } from './listing/guards/listing.guard';

const routes: Routes = [
  {
    path: 'booking',
    loadChildren: () => import('./booking/booking.module').then( m => m.BookingModule )
  },
  {
    path: 'listing',
    loadChildren: () => import('./listing/listing.module').then( m => m.ListingModule )    
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then( m => m.AccountModule ),
    canActivate: [ AccountGuard ]
  },
  {
    path:'**',
    redirectTo: 'booking',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
