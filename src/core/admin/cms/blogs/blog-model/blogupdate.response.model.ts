/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class BlogupdateResponseModel {
    public title: string;
    public content: string;
    public image: string;
    public link: string;
    public position: string;
    public blogId: number;

    constructor(updateResponse: any) {
        this.title = updateResponse.title || '';
        this.content = updateResponse.content || '';
        this.image = updateResponse.image || '';
        this.link = updateResponse.link || '';
        this.position = updateResponse.position || '';
        this.blogId = updateResponse.blogId || '';
    }
}
