import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../../../core/admin/providers/auth.guard';

import { AppointmentsLayout } from './components/layout/layout.component';



const storeRoutes: Routes = [
  { path: '', redirectTo: "appointments" , pathMatch: 'full'},
  
  {
    path: '',
    component: AppointmentsLayout,
    children: [
      {
        path: 'appointments',
        loadChildren: () => import('./components/appointments/appointments.module').then(m => m.AppointmentsModule),
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
export class ManageAppointmentsRoutingModule {}
