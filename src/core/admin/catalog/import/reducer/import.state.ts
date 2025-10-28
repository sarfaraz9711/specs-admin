/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Map, Record } from 'immutable';

export interface ImportState extends Map<string, any> {

  uploadFile: any;
  uploadFileLoading: any;
  uploadFileLoaded: any;
  uploadFileFailed: any;


}

export const ImportStateRecord = Record({

  uploadFile: {},
  uploadFileLoading: false,
  uploadFileLoaded: false,
  uploadFileFailed: false,

});
