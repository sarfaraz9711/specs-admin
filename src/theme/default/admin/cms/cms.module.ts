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
import { CMSLayoutComponent } from './components/layout/layout.component';
import { CMSHeaderComponent } from './components/header/header.component';
// Routing Module
import { CMSRoutingModule } from './cms.routing';

// Shared Module
import { MaterialModule } from '../../default.material.module';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../shared/components';
import { OurBrandComponent } from './components/our-brand/our-brand.component';
import {FuroHomePageComponent} from './components/furo/furo-home-page.component'
import { BannerService } from 'src/core/admin/cms/banners/banner.service';
import { SwitchComponent } from './components/switch/switch.component';
import { PageServiceService } from 'src/core/admin/page/page-service.service';
import { AddComponent } from './components/categoryimage/add/add.component';
import { ListComponent } from './components/categoryimage/list/list.component';
import { PopupMessageModule } from '../shared/model-popup/popup-message/popup-message.module';
import { NewBlogaddComponent } from './components/newblog/newblogadd/newblogadd.component';
import { NewBloglistComponent } from './components/newblog/newbloglist/newbloglist.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { CommentlistComponent } from './components/comments/commentlist/commentlist.component';
import { CategoryTextImageAdd } from './components/category-text-image/add/add.component';
import { CategoryTextImageList } from './components/category-text-image/list/list.component';

@NgModule({
  declarations: [CMSLayoutComponent, CMSHeaderComponent, OurBrandComponent, SwitchComponent, FuroHomePageComponent, AddComponent, ListComponent, NewBlogaddComponent, NewBloglistComponent, CommentlistComponent, CategoryTextImageAdd, CategoryTextImageList],
  imports: [
    CommonModule,
    CMSRoutingModule,
    DefaultCommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    ComponentsModule,
    PopupMessageModule,
    CKEditorModule
  ],
  providers: [BannerService,PageServiceService],
  bootstrap: [],
  entryComponents: []
})
export class CMSModule {}
