/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class CouponForm {
  public name: string;
  public sortOrder: number;
  public metaTagDescription: string;
  public metaTagKeyword: string;
  public metaTagTitle: string;
  public parentInt: number;
  public image: string;
  public imagePath: string;
  public status: number;

  constructor(couponForm: any) {
    this.name = couponForm.name || '';
    this.sortOrder = couponForm.sortOrder || '';
    this.metaTagDescription = couponForm.metaTagDescription || '';
    this.metaTagKeyword = couponForm.metaTagKeyword || '';
    this.metaTagTitle = couponForm.metaTagTitle || '';
    this.parentInt = couponForm.parentInt || 0;
    this.image = couponForm.image || '';
    this.imagePath = couponForm.imagePath || '';
    this.status = couponForm.status || '';
  }
}
