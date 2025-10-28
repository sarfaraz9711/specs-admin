/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

export class CoupondeleteForm {
  public couponId: number;
  public vendorCouponId: number;

  constructor(coupondeleteForm: any) {
    this.couponId = coupondeleteForm.couponId || '';
    this.vendorCouponId = coupondeleteForm.vendorCouponId || '';
  }
}
