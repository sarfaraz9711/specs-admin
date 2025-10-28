/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

export class CancelOrderListRequestModel {
    public limit: number;
    public offset: number;
    public keyword: string;
    public count: string;

    constructor(cancelOrderListForm: any) {
      this.limit = cancelOrderListForm.limit || '';
      this.offset = cancelOrderListForm.offset || '';
      this.keyword = cancelOrderListForm.keyword || '';
      this.count = cancelOrderListForm.count || '';
    }
  }
