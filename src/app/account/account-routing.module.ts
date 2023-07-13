import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './pages/account/account.component';
import { MySpacesComponent } from './pages/my-spaces/my-spaces.component';
import { PendingSpacesComponent } from './pages/pending-spaces/pending-spaces.component';
import { MySpaceComponent } from './pages/my-space/my-space.component';
import { EditMySpaceComponent } from './pages/edit-my-space/edit-my-space.component';

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
        path: 'my-spaces/:id',
        component: MySpaceComponent
      },
      {
        path: 'edit-my-space/:id',
        component: EditMySpaceComponent
      },
      {
        path: 'pending-spaces',
        component: PendingSpacesComponent
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
