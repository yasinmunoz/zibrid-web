import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoogleAuthPageComponent } from './google-auth-page/google-auth-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'signin',
        component: GoogleAuthPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoogleAuthRoutingModule { }
