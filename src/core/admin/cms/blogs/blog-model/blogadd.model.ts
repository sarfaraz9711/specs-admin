/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

export class BlogaddModel {


    public title: string;
    public categoryId: any;
    public description: string;
    public image: string;
    public status: string;
    public metaTagTitle: string;
    public metaTagDescription: string;
    public metaTagKeyword: string;
    public relatedBlogId: any;
    public blogSlug: any;
    constructor(blogForm: any) {
        this.title = blogForm.blogTitle || '';
        this.categoryId = blogForm.categories || '';
        this.description = blogForm.description	 || '';
        this.image = blogForm.image || '';
        this.status = String(blogForm.status) || '';
        this.metaTagTitle = blogForm.metaTitle || '';
        this.metaTagDescription = blogForm.metaContent || '';
        this.metaTagKeyword = blogForm.metaKeyword || '';
        this.relatedBlogId = blogForm.relatedBlogId || [];
        this.blogSlug = blogForm.blogSlug || '';
    }
}
