/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Map, Record } from 'immutable';

export interface BackorderListState extends Map<string, any> {

  backorderList: any;
  backorderListLoading: boolean;
  backorderListLoaded: boolean;
  backorderListFailed: boolean;

  backorderListCount: any;
  backorderListCountLoading: boolean;
  backorderListCountLoaded: boolean;
  backorderListCountFailed: boolean;


}

export const BackorderListStateRecord = Record({

  backorderList: [],
  backorderListLoading: false,
  backorderListLoaded: false,
  backorderListFailed: false,

  backorderListCount: '',
  backorderListCountLoading: false,
  backorderListCountLoaded: false,
  backorderListCountFailed: false,

});
