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
import { DefaultCommonModule } from '../../../../default.common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// components

// Store Actions
import { EffectsModule } from '@ngrx/effects';
// Routing Module

// Shared Module
import { MaterialModule } from '../../../../default.material.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { HttpLoaderFactory } from '../../../admin.module';
import { HttpClient } from '@angular/common/http';
// TRanslate Module
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { BlogListComponent } from './list/list.component';
import { BlogAddComponent } from './add/add.component';
import { BlogsRoutingModule } from './blogs.routing';

import { BlogService } from '../../../../../../core/admin/cms/blogs/blogs.service';
import { BlogEffect } from '../../../../../../core/admin/cms/blogs/blogs-effect/blog.effect';
import { BlogFilterComponent } from './filter/filter.component';
import { LayoutsSandbox } from '../../../../../../core/admin/catalog/layout/layout.sandbox';
import { LayoutService } from '../../../../../../core/admin/catalog/layout/layout.service';
import { BlogsLayoutComponent } from '../shared/blogs-layout/blogs-layout.component';
import { BlogSandbox } from '../../../../../../core/admin/cms/blogs/blog.sandbox';
import { CategoriesSandbox } from '../../../../../../core/admin/catalog/category/categories.sandbox';
import { PipeModule } from '../../../shared/components/pipes/category-search.pipe.module';
import { ComponentsModule } from '../../../shared/components';
import { CategoriesService } from 'src/core/admin/catalog/category/categories.service';
import { CategoriesEffect } from 'src/core/admin/catalog/category/effects/categories.effect';


@NgModule({
    declarations: [
        BlogAddComponent,
        BlogListComponent,
        BlogFilterComponent,
        BlogsLayoutComponent
    ],
    imports: [
        CommonModule,
        DefaultCommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        BlogsRoutingModule,
        EffectsModule.forFeature([BlogEffect, CategoriesEffect]),
        TranslateModule.forChild(
            {
                loader: {
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [HttpClient]
                }
            }
        ),
        CKEditorModule,
        PipeModule,
        ComponentsModule
    ],
    providers: [
        BlogService,
        BlogSandbox,
        LayoutsSandbox,
        LayoutService,
        CategoriesSandbox,
        CategoriesService
    ],
    bootstrap: [],
    entryComponents: []
})

export class BlogsModule {
}
