/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class BlogcountModel {


    public limit: number;
    public offset: number;
    public keyword: string;
    public count: string;
    public categoryId: any;



    constructor(blogcountForm: any) {
        this.limit = blogcountForm.limit || 0;
        this.offset = blogcountForm.offset || 0;
        this.keyword = blogcountForm.keyword || '';
        this.count = blogcountForm.count || '';
        this.categoryId = blogcountForm.categoryId || '';


    }
}
