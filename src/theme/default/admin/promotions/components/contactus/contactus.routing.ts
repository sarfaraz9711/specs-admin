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

import { ContactUsListComponent } from './list/list.component';

import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';

const contactUsRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list', component: ContactUsListComponent,
    canActivate: [AuthGuard],
    data: {
     // permission: 'list-customer',
      urls: [{ title: 'Subscriptions', url: '' },
      { title: 'Contact Us', url: '' },
      { title: 'List', url: '' }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(contactUsRoutes)],
  exports: [RouterModule]
})
export class ContactUsRoutingModule { }
