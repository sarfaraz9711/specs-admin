/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Map, Record } from 'immutable';

export interface InventoryProductState extends Map<string, any> {

  inventoryProductList: any;
  inventoryProductListLoading: boolean;
  inventoryProductListLoaded: boolean;
  inventoryProductListFailed: boolean;

  inventoryProductListCount: any;
  inventoryProductListCountLoading: boolean;
  inventoryProductListCountLoaded: boolean;
  inventoryProductListCountFailed: boolean;

}

export const InventoryProductStateRecord = Record({


  inventoryProductList: [],
  inventoryProductListLoading: false,
  inventoryProductListLoaded: false,
  inventoryProductListFailed: false,

  inventoryProductListCount: '',
  inventoryProductListCountLoading: false,
  inventoryProductListCountLoaded: false,
  inventoryProductListCountFailed: false,
});
