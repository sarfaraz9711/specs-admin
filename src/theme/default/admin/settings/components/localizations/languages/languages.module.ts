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
import { DefaultCommonModule } from '../../../../../default.common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// components
import { LanguageAddComponent } from './add/add.component';
import { LanguageListComponent } from './list/list.component';

// Routing Module
import { LanguagesRoutingModule } from './languages.routing';

// Shared Module
import { MaterialModule } from '../../../../../default.material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../../admin.module';
import { HttpClient } from '@angular/common/http';
import { ComponentsModule } from '../../../../../../default/admin/shared/components';
import { NumberAcceptModule } from 'src/core/admin/shared/validation-directives/onlyNumber.module';

@NgModule({
  declarations: [LanguageAddComponent, LanguageListComponent],
  imports: [
    CommonModule,
    DefaultCommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    LanguagesRoutingModule,
    ComponentsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NumberAcceptModule
  ],
  providers: [],
  bootstrap: [],
  entryComponents: [LanguageAddComponent]
})
export class LanguagesModule {}
