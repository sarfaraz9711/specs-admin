/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AuditLogComponent } from './components/audit-log/audit-log.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from '../../../../core/admin/providers/auth.guard';
import { FacilityCodeComponent } from './facility-code/add/add.component';
import { DeliveryTatComponent } from './delivery-tat/add/add.component';
import { OrderReportComponent } from './order-report/order-report.component';
import { PaymentReportComponent } from './payment-report/payment-report.component';
import { RemarkReportComponent } from './remark-report/remark-report.component';

const routes: Routes = [
  { path: '', redirectTo: 'sales-report', pathMatch: 'full' },
  {path: 'order-report', component:OrderReportComponent},
  {path: 'payment-report', component:PaymentReportComponent},
  
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'sales-report',
        loadChildren: () => import('./components/sales-report/sales-report.module').then(m => m.SalesReportModule),
        canActivate: [AuthGuard],
        data: { permissionForHeader: 'sales-report', root: 'reports' }
      },
      {
        path:"facility-code", component: FacilityCodeComponent,
        data: {
           urls: [{ title: 'Configration', url: '' },
           { title: 'Facility-code', url: '' },
           { title: 'Add', url: '' }]
         }
      },
      {
        path:"delivery-tat", component: DeliveryTatComponent,
        data: {
          urls: [{ title: 'Configration', url: '' },
          { title: 'Delivery-TAT', url: '' },
          { title: 'Add', url: '' }]
        }
      },
      {path: 'remark-report', component:RemarkReportComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
