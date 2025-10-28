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
import { ArchivePaymentListComponent } from './list/list.component';
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';


const paymentRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list', component: ArchivePaymentListComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'archive-payment-list',
      urls: [{ title: 'Sales', url: '' },
      { title: 'Archive Payments', url: '' },
      { title: 'List', url: '' }]
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(paymentRoutes)],
  exports: [RouterModule]
})
export class ArchivePaymentsRoutingModule { }
