import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaintenanceComponent } from './maintenance/maintenance.component';

  const maintenanceRoutes: Routes = [{ path: '', component: MaintenanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(maintenanceRoutes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
