import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from 'src/core/admin/providers/auth.guard';
import { RouterModule, ROUTES, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const Routers: Routes = [
  { path: '', redirectTo: 'audit-log', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'audit-log',
        loadChildren: () => import('./components/audit-log/audit-log.module').then(m => m.AuditLogModule),
        canActivate: [AuthGuard],
        // data: { permissionForHeader: 'list-tax', root: 'settingsLocal' }
      },
      {
        path: 'data-back-up',
        loadChildren: () => import('./components/data-backup/data-backup.module').then(m => m.DataBackupModule),
        canActivate: [AuthGuard],
        // data: { permissionForHeader: 'list-email-template', root: 'settingsLocal' }
      }
    ]
  }
];

@NgModule({
  declarations: [
    LayoutComponent,

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(Routers),
    NgbModule
  ]
})
export class DataModule { }
