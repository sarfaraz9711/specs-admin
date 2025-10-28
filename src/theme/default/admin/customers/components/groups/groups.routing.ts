/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component
import { GroupsAddComponent } from './add/add.component';
import { GroupsListComponent } from './list/list.component';
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';

const groupsRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list', component: GroupsListComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'list-customer-group',
      urls: [{ title: 'Customers', url: '' },
      { title: 'Groups', url: '' },
      { title: 'List', url: '' }]
    }
  },

  {
    path: 'add', component: GroupsAddComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'create-customer-group', urls: [{ title: 'Customers', url: '' },
      { title: 'Groups', url: '' },
      { title: 'Add', url: '' }]
    }
  },
  {
    path: 'edit/:id',
    component: GroupsAddComponent, canActivate: [AuthGuard],
    data: {
      permission: 'edit-customer-group',
      urls: [{ title: 'Customers', url: '' },
      { title: 'Groups', url: '' },
      { title: 'Update', url: '' }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(groupsRoutes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }
