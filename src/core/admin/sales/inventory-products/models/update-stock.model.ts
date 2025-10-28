/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

export class UpdateStockModel {
  public productId: number;
  public hasStock: string;
  public productStock: any;



  constructor(updateModel: any) {
    this.productId = updateModel.productId || '';
    this.hasStock = updateModel.hasStock || 0;
    this.productStock = updateModel.productStock || [];
  }
}
