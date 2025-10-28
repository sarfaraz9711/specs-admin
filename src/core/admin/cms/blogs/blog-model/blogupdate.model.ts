/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

export class BlogupdateModel {
    public title: string;
    public categoryId: any;
    public description: string;
    public image: string;
    public status: string;
    public metaTagTitle: string;
    public metaTagDescription: string;
    public metaTagKeyword: string;
    public blogId: number;
    public relatedBlogId: any;
    public blogSlug: any;
    constructor(blogupdate: any) {
        this.title = blogupdate.blogTitle || '';
        this.categoryId = blogupdate.categories || '';
        this.description = blogupdate.description	 || '';
        this.image = blogupdate.image || '';
        this.status = String(blogupdate.status) || '';
        this.metaTagTitle = blogupdate.metaTitle || '';
        this.metaTagDescription = blogupdate.metaContent || '';
        this.metaTagKeyword = blogupdate.metaKeyword || '';
        if (blogupdate.blogId) {
            this.blogId = blogupdate.blogId || '';
        }
        this.relatedBlogId = blogupdate.relatedBlogId || [];
        this.blogSlug = blogupdate.blogSlug || '';
    }
}
