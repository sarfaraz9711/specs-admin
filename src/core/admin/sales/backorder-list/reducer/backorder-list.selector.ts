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
import * as fromBackorderListRequest from './backorder-list.reducer';
// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */

export const backorderListState = (state: AppState) => state.backorderList;

export const backorderList = createSelector(backorderListState, fromBackorderListRequest.backorderList);
export const backorderListLoading = createSelector(backorderListState, fromBackorderListRequest.backorderListLoading);
export const backorderListLoaded = createSelector(backorderListState, fromBackorderListRequest.backorderListLoaded);

export const backorderListCount = createSelector(backorderListState, fromBackorderListRequest.backorderListCount);
export const backorderListCountLoading = createSelector(backorderListState, fromBackorderListRequest.backorderListCountLoading);
export const backorderListCountLoaded = createSelector(backorderListState, fromBackorderListRequest.backorderListCountLoaded);
