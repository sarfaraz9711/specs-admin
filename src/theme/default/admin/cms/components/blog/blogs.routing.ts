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
import { BlogListComponent } from './list/list.component';
import { BlogAddComponent } from './add/add.component';
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';


const blogsRoutes: Routes = [
    {path: '', redirectTo: 'list', pathMatch: 'full'},
    {path: 'list', component: BlogListComponent,
    canActivate: [AuthGuard],
    data: {
        permission: 'list-blogs',
        urls: [{ title: 'CMS', url: '' },
        { title: 'Blogs', url: '' },
        { title: 'List', url: '' }]
       }
},
    {path: 'add', component: BlogAddComponent,
    canActivate: [AuthGuard],
    data: {
        permission: 'create-blogs',
        urls: [{ title: 'CMS', url: '' },
        { title: 'Blogs', url: '' },
        { title: 'Add', url: '' }]
       }
},
    {
        path: 'edit/:id',
        component: BlogAddComponent,
        canActivate: [AuthGuard],
        data: {
            permission: 'edit-blogs',
            urls: [{ title: 'CMS', url: '' },
            { title: 'Blogs', url: '' },
            { title: 'Update', url: '' }]
           }
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(blogsRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class BlogsRoutingModule {
}
