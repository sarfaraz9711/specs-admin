/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class TaxListResponseModel {
  public taxId: string;
  public title: string;
  public value: string;
  public isActive: number;

  constructor(listResponse: any) {
    this.taxId = listResponse.taxId || '';
    this.title = listResponse.taxName || '';
    this.value = listResponse.taxPercentage || '';
    this.isActive = listResponse.taxStatus || 0;
  }
}
