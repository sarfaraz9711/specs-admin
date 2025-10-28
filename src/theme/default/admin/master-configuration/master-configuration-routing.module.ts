import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDeleteFSMappingComponent } from './components/add-delete-f-s-mapping/add-delete-f-s-mapping.component';
import { FacilitySkuUploadComponent } from './components/facility-sku-upload/facility-sku-upload.component';
import { ListComponent } from './components/list-f-s-mapping/list-f-s-mapping.component';
import { MasterFacilityLayoutComponent } from './components/master-facility-layout/master-facility-layout.component';
// import { MasterFacilityLayoutComponent } from './components/master-facility-layout/master-facility-layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'import-facility-sku', pathMatch: 'full' },
  {
    path: "", 
    component : MasterFacilityLayoutComponent,
    children : [
      {
        path: 'import-facility-sku', component : FacilitySkuUploadComponent
      },
      {
        path: 'add-delete-facility-sku', component : AddDeleteFSMappingComponent
      },
      {
        path: 'list-facility-sku', component : ListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterConfigurationRoutingModule { }
