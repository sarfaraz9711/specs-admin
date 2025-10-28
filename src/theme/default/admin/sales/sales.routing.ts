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
import { SalesLayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from '../../../../core/admin/providers/auth.guard';
import { ReturnOrderComponent } from './components/return-order/return-order.component';
import { CreditNotesComponent } from './components/credit-notes/credit-notes.component';
import { CreateCreditNotesComponent } from './components/credit-notes/create/create-credit-notes.component';

const salesRoutes: Routes = [
  { path: '', redirectTo: 'orders', pathMatch: 'full' },
  {
    path: '',
    component: SalesLayoutComponent,
    children: [
      {
        path: 'orders',
        loadChildren: () => import('./components/orders/orders.module').then(m => m.OrdersModule),
        canActivate: [AuthGuard],
        data: {root: 'sales', permissionForHeader: 'sales-orders'}
      },
      {
        path: 'payments',
        loadChildren: () => import('./components/sales-payments/sales-payments.module').then(m => m.SalesPaymentsModule),
        canActivate: [AuthGuard],
        data: {root: 'sales', permissionForHeader: 'sales-payments'}
      },
      {
        path: 'cancel-orders',
        loadChildren: () => import('./components/cancel-orders/cancel-orders.module').then(m => m.CancelOrdersModule),
        canActivate: [AuthGuard],
        data: {root: 'sales', permissionForHeader: 'sales-cancel-request'}

      },
      {
        path: 'return-orders', component: ReturnOrderComponent, canActivate: [AuthGuard]

      },
      {
        path: 'archive-payments',
        loadChildren: () => import('./components/archive-payments/archive-payments.module').then(m => m.ArchivePaymentsModule),
        canActivate: [AuthGuard],
        data: {root: 'sales', permissionForHeader: 'sales-archive-paments'}
      },
      {
        path: 'quotation-requests',
        loadChildren: () => import('./components/quotation-requests/quotation-requests.module').then(m => m.QuotationRequestsModule),
        canActivate: [AuthGuard],
        data: {root: 'sales', permissionForHeader: 'sales-quotation-request'}
      },
      {
        path: 'inventory-products',
        loadChildren: () => import('./components/inventory-products/inventory-products.module').then(m => m.InventroyProductsModule),
        canActivate: [AuthGuard],
        data: {root: 'sales', permissionForHeader: 'sales-inventory'}
      },
      {
        path: 'backorder',
        loadChildren: () => import('./components/backorder-list/backorder-list.module').then(m => m.BackorderListModule),
        canActivate: [AuthGuard],
        data: {root: 'sales', permissionForHeader: 'sales-back-order'}
      },
      {
        path: 'failed-order',
        loadChildren: () => import('./components/failed-order/failed-order.module').then(m => m.FailedOrderModule),
        canActivate: [AuthGuard],
        data: {root: 'sales', permissionForHeader: 'sales-failed-order'}
      },
      {
        path: 'credit-notes', component: CreditNotesComponent, canActivate: [AuthGuard]

      },
      {
        path: 'create-credit-notes', component: CreateCreditNotesComponent, canActivate: [AuthGuard]

      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(salesRoutes)],
  exports: [RouterModule]
})
export class SalesRoutingModule {}
