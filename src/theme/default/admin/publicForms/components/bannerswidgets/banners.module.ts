import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { FeedbackRoutingModule } from './feedback-routing.module';

import { ListComponent } from './list/list.component';
import { BannerLayoutComponent } from '../shared/banners-layout/banner-layout.component'

//Store Actions
import { EffectsModule } from '@ngrx/effects';
import { BannerSandbox } from '../../../../../../core/admin/cms/banners/banner.sandbox';
import { BannerService} from '../../../../../../core/admin/cms/banners/banner.service';
import { BannerEffect } from '../../../../../../core/admin/cms/banners/banner-effect/banner.effect';
import { BannerRoutingModule } from './banners-routing.module';
import { ExcelService } from 'src/core/admin/PublicForms/excelbanners.service';

@NgModule({
  declarations: [
    ListComponent,
    BannerLayoutComponent
  ],
  imports: [
    CommonModule,
    BannerRoutingModule,
    EffectsModule.forFeature([BannerEffect])
  ],
  
  providers: [BannerService, BannerSandbox, ExcelService],
  bootstrap: [],

})
export class BannerModuleA { }
