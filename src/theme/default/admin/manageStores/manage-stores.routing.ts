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

import { AuthGuard } from '../../../../core/admin/providers/auth.guard';

import { StoresLayout } from './components/layout/layout.component';



const storeRoutes: Routes = [
  { path: '', redirectTo: "stores" , pathMatch: 'full'},
  
  {
    path: '',
    component: StoresLayout,
    children: [
      {
        path: 'stores',
        loadChildren: () => import('./components/stores/stores.module').then(m => m.StoresModule),
        //canActivate: [AuthGuard],
        //data: { permissionForHeader: 'customers-customer', root: 'feedback' }
      },
      
    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(storeRoutes)],
  exports: [RouterModule]
})
export class ManageStoresRoutingModule {}
