/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class BloglistResponseModel {

    public categoryName: string;
    public description: string;
    public isActive: number;
    public image: string;
    public imagePath: string;
    public title: string;
    public id: any;
    public categoryId: any;
    public metaTagDescription: string;
    public metaTagKeyword: string;
    public metaTagTitle: string;

    constructor(bloglistResponse: any) {
        this.categoryName = bloglistResponse.categoryName || '';
        this.description = bloglistResponse.description || '';
        this.isActive = bloglistResponse.isActive || 0;
        this.image = bloglistResponse.image || '';
        this.imagePath = bloglistResponse.imagePath || '';
        this.title = bloglistResponse.title || '';
        this.id = bloglistResponse.id || '';
        this.categoryId = bloglistResponse.categoryId || '';
        this.metaTagDescription = bloglistResponse.metaTagDescription || '';
        this.metaTagKeyword = bloglistResponse.metaTagKeyword || '';
        this.metaTagTitle = bloglistResponse.metaTagTitle || '';
    }

}
