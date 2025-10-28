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
import { PageGroupAddComponent } from './add/add.component';
import { PageGroupListComponent } from './list/list.component';
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';

const pagesRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: PageGroupListComponent,
  canActivate: [AuthGuard],
  data: {
    permission: 'page-group-list',
    urls: [{ title: 'CMS', url: '' },
    { title: 'Page Group', url: '' },
    { title: 'List', url: '' }]
   }
 },
  { path: 'add', component: PageGroupAddComponent, canActivate: [AuthGuard],
  data: { permission: 'add-page-group',     urls: [{ title: 'CMS', url: '' },
  { title: 'Page Group', url: '' },
  { title: 'Add', url: '' }] } },
  {
    path: 'edit/:id',
    component: PageGroupAddComponent, canActivate: [AuthGuard],
    data: { permission: 'Edit-page-group',     urls: [{ title: 'CMS', url: '' },
    { title: 'Page Group', url: '' },
    { title: 'Update', url: '' }] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule]
})
export class PageGroupRoutingModule {}
