/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

export class CouponcountForm {
  public limit: number;
  public offset: number;
  public keyword: string;
  public sortOrder: string;
  public count: string;
  public status:any;

  constructor(couponcountForm: any) {
    this.limit = couponcountForm.limit || '';
    this.offset = couponcountForm.offset || '';
    this.keyword = couponcountForm.keyword || '';
    this.sortOrder = couponcountForm.sortOrder || '';
    this.count = couponcountForm.count || '';
    this.status = couponcountForm.status || '';
  }
}
