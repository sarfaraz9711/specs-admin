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
import { QuotationListComponent } from './list/list.component';
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';

const quotationRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list', component: QuotationListComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'quotation-request-list',
      urls: [{ title: 'Sales', url: '' },
      { title: 'Quotation Request', url: '' },
      { title: 'List', url: '' }]
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(quotationRoutes)],
  exports: [RouterModule]
})
export class QuotationRequestsRoutingModule { }
