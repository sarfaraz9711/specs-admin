/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CMSLayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from '../../../../core/admin/providers/auth.guard';
import { OurBrandComponent } from './components/our-brand/our-brand.component';
import { AddComponent } from './components/categoryimage/add/add.component';
import { ListComponent } from './components/categoryimage/list/list.component';
import { NewBlogaddComponent } from './components/newblog/newblogadd/newblogadd.component';
import { NewBloglistComponent } from './components/newblog/newbloglist/newbloglist.component';
import { CommentlistComponent } from './components/comments/commentlist/commentlist.component';
import { FuroHomePageComponent } from './components/furo/furo-home-page.component';
import { CategoryTextImageAdd } from './components/category-text-image/add/add.component';
import { CategoryTextImageList } from './components/category-text-image/list/list.component';


const cmsRoutes: Routes = [
  {path:'add-our-brand', component: OurBrandComponent},
  {path:'furo-home-page', component: OurBrandComponent},
  {path:'add-offer-image', component: OurBrandComponent},
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  {
    path: '',
    component: CMSLayoutComponent,
    children: [
      {
        path: 'banners',
        loadChildren: () => import('./components/banner/banner.module').then(m => m.BannerModule),
        canActivate: [AuthGuard],
        data: { permissionForHeader: 'cms-banners', root: 'cms' }
      },{
        path: 'furo-banners',
        loadChildren: () => import('./components/banner/banner.module').then(m => m.BannerModule),
        canActivate: [AuthGuard],
        data: { permissionForHeader: 'cms-banners', root: 'cms' }
      },
      {
        path: 'pages',
        loadChildren: () => import('./components/pages/pages.module').then(m => m.PagesModule),
        canActivate: [AuthGuard],
        data: { permissionForHeader: 'cms-pages', root: 'cms' }
      },
      {
        path: 'blogs',
        loadChildren: () => import('./components/blog/blogs.module').then(m => m.BlogsModule),
        canActivate: [AuthGuard],
        data: { permissionForHeader: 'cms-blogs', root: 'cms' }
      },
      {
        path: 'page-group',
        loadChildren: () => import('./components/page-group/page-group.module').then(m => m.PageGroupModule),
        canActivate: [AuthGuard],
        data: { permissionForHeader: 'cms-page-group', root: 'cms' }
      },
      {
        path: 'list', component: ListComponent,
        data: {
          urls: [{ title: 'cms', url: '' },
          { title: 'categoryimage', url: '' },
          { title: 'List', url: '' }]
        }
      },
      {
        path:"add", component: AddComponent,
        data: {
          urls: [{ title: 'cms', url: '' },
          { title: 'categoryimage', url: '' },
          { title: 'Add', url: '' }]
        }
      },
      {
        path: 'category-list', component: CategoryTextImageList,
        data: {
          urls: [{ title: 'cms', url: '' },
          { title: 'category-text-image', url: '' },
          { title: 'List', url: '' }]
        }
      },
      {
        path:"category-add", component: CategoryTextImageAdd,
        data: {
          urls: [{ title: 'cms', url: '' },
          { title: 'category-text-image', url: '' },
          { title: 'Add', url: '' }]
        }
      },
      {
        path: 'edit/:id', component: AddComponent,
        data: {
          urls: [{ title: 'cms', url: '' },
          { title: 'categoryimage', url: '' },
          { title: 'Edit', url: '' }]
        }
      },
      {
        path: 'Blogs/list', component: NewBloglistComponent,
        data: {
          urls: [{ title: 'cms', url: '' },
          { title: 'Blogs', url: '' },
          { title: 'List', url: '' }]
        }
      },
      {
        path:"Blogs/add", component: NewBlogaddComponent,
        data: {
          urls: [{ title: 'cms', url: '' },
          { title: 'Blogs', url: '' },
          { title: 'Add', url: '' }]
        }
      },

      {
        path: 'Blogs/edit/:id', component: NewBlogaddComponent,
        data: {
          urls: [{ title: 'cms', url: '' },
          { title: 'Blogs', url: '' },
          { title: 'Edit', url: '' }]
        }
      },
      {
        path: 'comment/list', component: CommentlistComponent,
        data: {
          urls: [{ title: 'cms', url: '' },
          { title: 'comment', url: '' },
          { title: 'List', url: '' }]
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(cmsRoutes)],
  exports: [RouterModule]
})
export class CMSRoutingModule {}
