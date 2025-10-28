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
import { VariantsAddComponent } from './add/add.component';
import { VariantsListComponent } from './list/list.component';
import { AuthGuard } from '../../../../../../../core/admin/providers/auth.guard';

const prodOptionRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: VariantsListComponent, canActivate: [AuthGuard], data: { permission: 'variant-list' } },
  { path: 'add', component: VariantsAddComponent, canActivate: [AuthGuard],
  data: { permission: 'variant-add' } },
  {
    path: 'edit/:id',
    component: VariantsAddComponent, canActivate: [AuthGuard],
    data: { permission: 'variant-edit' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(prodOptionRoutes)],
  exports: [RouterModule]
})
export class VariantsRoutingModule {}
