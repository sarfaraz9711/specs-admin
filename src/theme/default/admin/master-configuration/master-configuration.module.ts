import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../shared/components';
import { DefaultCommonModule } from '../../default.common.module';
import { MaterialModule } from '../../default.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { PopupMessageModule } from '../shared/model-popup/popup-message/popup-message.module';
import { MasterFacilityLayoutComponent } from './components/master-facility-layout/master-facility-layout.component';
// import { FacilitySkuUploadComponent } from './components/facility-sku-upload/facility-sku-upload.component';
// import { EffectsModule } from '@ngrx/effects';
// import { LayoutEffects } from 'src/core/admin/catalog/layout/effects/layout.effect';
import { FsHeaderComponent } from './components/fs-header/fs-header.component';
import { MasterConfigurationRoutingModule } from './master-configuration-routing.module';
import { AddDeleteFSMappingComponent } from './components/add-delete-f-s-mapping/add-delete-f-s-mapping.component';
import { FacilitySkuUploadComponent } from './components/facility-sku-upload/facility-sku-upload.component';
import { AddFacilitySkuMappingService } from 'src/core/admin/master-configuration/add-delete-f-s-mapping.service';
import { ListComponent } from './components/list-f-s-mapping/list-f-s-mapping.component';
import { FacilityFilterComponent } from './components/filter/filter.component';


@NgModule({
  declarations: [
    MasterFacilityLayoutComponent,
    FacilitySkuUploadComponent,
    FsHeaderComponent,
    AddDeleteFSMappingComponent,
    ListComponent,
    FacilityFilterComponent
  ],
  imports: [
    CommonModule,
    //CustomersRoutingModule,
    DefaultCommonModule,
    MaterialModule,
    FormsModule,
    MasterConfigurationRoutingModule,
    //PublicFormsRoutingModule,
    ReactiveFormsModule,
    // EffectsModule.forFeature([LayoutEffects]),
    TranslateModule.forChild(),
    ComponentsModule,
    NgSelectModule,
    PopupMessageModule
  ],
  providers: [AddFacilitySkuMappingService],
})
export class MasterConfigurationModule {}
