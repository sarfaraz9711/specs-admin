import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/core/admin/providers/auth.guard';
import { LayoutComponent } from './layout/layout.component';


const Routers: Routes = [
  { path: '', redirectTo: 'appearence', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'seo',
        pathMatch: 'full'
      },
      {
        path: 'seo',
        loadChildren: () => import('./seo/seo.module').then(m => m.SeoModule),
        canActivate: [AuthGuard],
        // data: { permissionForHeader: 'settings-site-filter', root: 'settingsSite' }
      },
      {
        path: 'social',
        loadChildren: () => import('./social/social.module').then(m => m.SocialModule),
        canActivate: [AuthGuard],
        // data: { permissionForHeader: 'settings-site-filter', root: 'settingsSite' }
      },
      {
        path: 'variants',
        loadChildren: () => import('./variants/variants.module').then(m => m.VariantsModule),
        canActivate: [AuthGuard],
        data: { permissionForHeader: 'settings-site-variant', root: 'settingsSite' }
      },
      
      {
        path: 'signup-promo-setting',
        loadChildren: () => import('./signupPromo/signupPromo.module').then(m => m.SeoModule),
        canActivate: [AuthGuard],
        // data: { permissionForHeader: 'settings-site-filter', root: 'settingsSite' }
      },
      
      {
        path: 'facility',
        loadChildren: () => import('./facilityCode/facilityCode.module').then(m => m.FacilityCodeModule),
        canActivate: [AuthGuard],
        // data: { permissionForHeader: 'settings-site-filter', root: 'settingsSite' }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(Routers)],
  exports: [RouterModule]
})
export class SiteSettingsRoutingModule { }
