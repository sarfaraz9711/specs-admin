/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// components

// Store Actions
import { EffectsModule } from '@ngrx/effects';

// Routing Module

// Shared Module
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../../../../../default.material.module';
import { FacilityCodeRouting } from './FacilityCode.routing';
import { FacilityCodeComponent } from './FacilityCode.component';
import { DefaultCommonModule } from '../../../../../default.common.module';
import { SeoService } from '../../../../../../../core/admin/settings/siteSettings/seo/seo-service';
import { SeoSandbox } from '../../../../../../../core/admin/settings/siteSettings/seo/seo-sandbox';
import { SeoEffect } from '../../../../../../../core/admin/settings/siteSettings/seo/seo-effects/seo-effect';
import { HttpLoaderFactory } from '../../../../admin.module';
import { HttpClient } from '@angular/common/http';
import { ComponentsModule } from '../../../../shared/components';
import { LayoutService } from 'src/core/admin/catalog/layout/layout.service';
import { BannerService } from 'src/core/admin/cms/banners/banner.service';



@NgModule({
  declarations: [FacilityCodeComponent],
  imports: [
    CommonModule,
    DefaultCommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FacilityCodeRouting,
    ComponentsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    EffectsModule.forFeature([SeoEffect])
  ],
  providers: [SeoSandbox, LayoutService, SeoService,BannerService],
  bootstrap: [],
  entryComponents: []
})
export class FacilityCodeModule {}
