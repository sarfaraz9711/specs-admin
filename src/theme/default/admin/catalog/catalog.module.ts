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
import { DefaultCommonModule } from '../../default.common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// components
import { CatalogLayoutComponent } from './components/layout/layout.component';
import { CatalogHeaderComponent } from './components/header/header.component';
// Routing Module
import { CatalogRoutingModule } from './catalog.routing';
// Shared Module
import { MaterialModule } from '../../default.material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CKEditorModule } from 'ng2-ckeditor';
// Store Actions
import { EffectsModule } from '@ngrx/effects';
import { LayoutService } from '../../../../core/admin/catalog/layout/layout.service';
import { LayoutsSandbox } from '../../../../core/admin/catalog/layout/layout.sandbox';
import { LayoutEffects } from '../../../../core/admin/catalog/layout/effects/layout.effect';
import { CategoriesEffect } from '../../../../core/admin/catalog/category/effects/categories.effect';
import { HttpLoaderFactory } from '../admin.module';
import { HttpClient } from '@angular/common/http';
import { RatingReviewEffect } from '../../../../core/admin/catalog/ratingReview/ratingReview-effect/ratingReview.effect';
import { RatingReviewSandbox } from '../../../../core/admin/catalog/ratingReview/ratingReview.sandbox';
import { RatingReviewService } from '../../../../core/admin/catalog/ratingReview/ratingReview.service';
import { CategoriesSandbox } from '../../../../core/admin/catalog/category/categories.sandbox';
import { CategoriesService } from '../../../../core/admin/catalog/category/categories.service';
import { BrandSandbox } from '../../../../core/admin/catalog/brand/brand.sandbox';
import { BrandApiClient } from '../../../../core/admin/catalog/brand/brandApiClientservice';
import { BrandEffects } from '../../../../core/admin/catalog/brand/effects/brand.effect';
import { ComponentsModule } from '../shared/components';
import { EmployeeComponent } from './components/employee/employee.component';
import { PopupMessageModule } from '../shared/model-popup/popup-message/popup-message.module';
import { ImportService } from 'src/core/admin/catalog/import/import.service';
import { ExcelService } from 'src/core/admin/reports/excelfacility.service';

@NgModule({
  declarations: [CatalogLayoutComponent, CatalogHeaderComponent, EmployeeComponent],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    DefaultCommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([
      LayoutEffects,
      RatingReviewEffect,
      CategoriesEffect, BrandEffects
    ]),

    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    CKEditorModule,
    ComponentsModule,
    PopupMessageModule
  ],
  providers: [
    LayoutService,
    LayoutsSandbox,
    RatingReviewSandbox,
    RatingReviewService,
    CategoriesSandbox,
    CategoriesService, BrandSandbox, BrandApiClient,ImportService,ExcelService,
  ],
  bootstrap: [],
  entryComponents: []
})
export class CatalogModule {}
