/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

export class CouponResponseModel {
  public add: any = {};

  constructor(couponFormResponse: any) {
    this.add = couponFormResponse || '';
  }
}
