import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../../../core/admin/providers/auth.guard';

import { AppointmentsLayout } from './components/layout/layout.component';



const appointmentRoutes: Routes = [
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
      {
        path: 'booked-appointments',
        loadChildren: () => import('./components/booked-appointments/booked-appointment.module').then(m => m.BookedAppointmentsModule),
        //canActivate: [AuthGuard],
        //data: { permissionForHeader: 'customers-customer', root: 'feedback' }
      },

    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(appointmentRoutes)],
  exports: [RouterModule]
})
export class ManageAppointmentsRoutingModule {}
