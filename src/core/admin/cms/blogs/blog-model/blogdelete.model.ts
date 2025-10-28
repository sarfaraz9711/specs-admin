/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

export class BlogdeleteModel {

    public blogId: number;

    constructor(deleteblog: any) {
            this.blogId = deleteblog.blogId || '';
    }
}
