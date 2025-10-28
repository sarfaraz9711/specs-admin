/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { NgModule } from '@angular/core';
import { SideSettingLayoutComponent } from './layout/layout.component';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from '../../../shared/components';
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';



const Routers: Routes = [
    { path: '', redirectTo: 'appearence', pathMatch: 'full' },
    {
        path: '',
        component: SideSettingLayoutComponent,
        children: [
            {
                path: 'maintenance',
                loadChildren: () => import('./maintenance/maintenance.module').then(m => m.MaintenanceModule),
                canActivate: [AuthGuard],
                // data: { permissionForHeader: 'settings-site-payments', root: 'settingsSite' }
            },

            {
                path: 'email',
                loadChildren: () => import('./emailtemplate/emailtemplate.module').then(m => m.EmailTemplateModule),
                canActivate: [AuthGuard],
                // data: { permissionForHeader: 'settings-site-social', root: 'settingsSite' }
            },
            {
                path: 'smtp',
                loadChildren: () => import('./smtp/smtp.module').then(m => m.SmtpModule),
                canActivate: [AuthGuard],
                // data: { permissionForHeader: 'settings-site-social', root: 'settingsSite' }
            },
            {
                path: 'sms',
                loadChildren: () => import('./sms/sms.module').then(m => m.SmsModule),
                canActivate: [AuthGuard],
                // data: { permissionForHeader: 'settings-site-social', root: 'settingsSite' }
            },

            {
                path: '',
                redirectTo: 'maintenance',
                pathMatch: 'full'
            },
        ]
    }


];
@NgModule({
    declarations: [SideSettingLayoutComponent],
    imports: [
        RouterModule.forChild(Routers),
        ComponentsModule
    ],
    providers: [],
    exports: [RouterModule]
})
export class SiteSettingsModule {

}
