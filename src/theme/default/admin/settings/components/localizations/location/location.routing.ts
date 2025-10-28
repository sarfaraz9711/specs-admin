/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import {NgModule} from '@angular/core';
import {
    RouterModule,
    Routes
} from '@angular/router';

// Component
import {LocationAddComponent} from './add/add.component';
import {LocationListComponent} from './list/list.component';
import { AuthGuard } from '../../../../../../../core/admin/providers/auth.guard';


const locationRoutes: Routes = [
    {path: '', redirectTo: 'list', pathMatch: 'full'},
    {path: 'list', component: LocationListComponent, canActivate: [AuthGuard],
    data: { permission: 'delivery-location-list' }},
    {path: 'add', component: LocationAddComponent, canActivate: [AuthGuard],
    data: { permission: 'add-delivery-location' }},
    {
        path: 'edit/:id',
        component: LocationAddComponent,
        canActivate: [AuthGuard],
  data: { permission: 'update-delivery-location' }
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(locationRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class LocationRoutingModule {
}
