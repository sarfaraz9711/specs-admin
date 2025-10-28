/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Map, Record } from 'immutable';

export interface SalesPaymentState extends Map<string, any> {

  paymentList: any;
  paymentListLoading: boolean;
  paymentListLoaded: boolean;
  paymentListFailed: boolean;

  paymentListCount: any;
  paymentListCountLoading: boolean;
  paymentListCountLoaded: boolean;
  paymentListCountFailed: boolean;

  makePaymentArchive: any;
  makePaymentArchiveLoading: boolean;
  makePaymentArchiveLoaded: boolean;
  makePaymentArchiveFailed: boolean;


  GetPaymentMode: any;
  GetPaymentModeLoading: boolean;
  GetPaymentModeLoaded: boolean;
  GetPaymentModeFailed: boolean;
}

export const SalesPaymentStateRecord = Record({

  paymentList: [],
  paymentListLoading: false,
  paymentListLoaded: false,
  paymentListFailed: false,

  paymentListCount: [],
  paymentListCountLoading: false,
  paymentListCountLoaded: false,
  paymentListCountFailed: false,

  makePaymentArchive: {},
  makePaymentArchiveLoading: false,
  makePaymentArchiveLoaded: false,
  makePaymentArchiveFailed: false,


  GetPaymentMode: {},
  GetPaymentModeLoading: false,
  GetPaymentModeLoaded: false,
  GetPaymentModeFailed: false,
});
