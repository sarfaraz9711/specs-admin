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
import { AuditLogComponent } from './audit-log.component';
import { AuthGuard } from '../../../../../../../../core/admin/providers/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list', component: AuditLogComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'audit-log',
      urls: [{ title: 'Reports', url: '' },
      { title: 'Audit Logs', url: '' },
      { title: 'List', url: '' }]
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditLogRoutingModule { }
