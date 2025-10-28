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
import { BackorderListComponent } from './list/list.component';
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';

const quotationRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list', component: BackorderListComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'back-order-list',
      urls: [{ title: 'Sales', url: '' },
      { title: 'Back Order', url: '' },
      { title: 'List', url: '' }]
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(quotationRoutes)],
  exports: [RouterModule]
})
export class BackorderListRoutingModule { }
