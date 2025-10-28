/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class BlogForm {


    public title: string;
    public content: string;
    public image: string;
    public link: string;
    public position: string;
    public blogId: number;
    public blogSlug: any;

    constructor(blogForm: any) {

        this.title = blogForm.title || '';
        this.content = blogForm.content || '';
        this.image = blogForm.image || '';
        this.link = blogForm.link || '';
        this.position = blogForm.position || '';
        this.blogSlug = blogForm.blogSlug || '';
        if (blogForm.blogId) {
            this.blogId = blogForm.blogId || '';
        }
    }
}
