/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { AppState } from '../../../../app.state.interface';
import { createSelector } from 'reselect';
import * as fromArchivePayment from './archive-payments.reducer';
// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */

export const archivePaymentState = (state: AppState) => state.archivePayment;

export const archivePaymentList = createSelector(archivePaymentState, fromArchivePayment.archivePaymentList);
export const archivePaymentListLoading = createSelector(archivePaymentState, fromArchivePayment.archivePaymentListLoading);
export const archivePaymentListLoaded = createSelector(archivePaymentState, fromArchivePayment.archivePaymentListLoaded);

export const archivePaymentListCount = createSelector(archivePaymentState, fromArchivePayment.archivePaymentListCount);
export const archivePaymentListCountLoading = createSelector(archivePaymentState, fromArchivePayment.archivePaymentListCountLoading);
export const archivePaymentListCountLoaded = createSelector(archivePaymentState, fromArchivePayment.archivePaymentListCountLoaded);
