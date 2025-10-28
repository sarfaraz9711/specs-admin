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

import { ListComponent } from './list/list.component';
import { AddStoreComponent} from './add/add.component'; 

import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';

const contactUsRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list', component: ListComponent,
    canActivate: [AuthGuard],
    data: {
     // permission: 'list-customer',
      urls: [{ title: 'Stores', url: '' },
      
      { title: 'List', url: '' }]
    }
  },
  {
    path: 'add', component: AddStoreComponent,
    canActivate: [AuthGuard],
    data: {
     // permission: 'list-customer',
      urls: [{ title: 'Stores', url: '' },
      
      { title: 'List', url: '' }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(contactUsRoutes)],
  exports: [RouterModule]
})
export class StoresRoutingModule { }
