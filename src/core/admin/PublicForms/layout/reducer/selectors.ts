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
import * as fromContactUsLayout from './layout.reducer';

// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */
export const getContactUsLayoutState = (state: AppState) => state.contactUsLayout;


export const contactUsCount = createSelector(
    getContactUsLayoutState,
    fromContactUsLayout.contactUsCount
  
);
export const contactUsCountLoading = createSelector(
    getContactUsLayoutState,
    fromContactUsLayout.contactUsCountLoading
);
export const contactUsCountLoaded = createSelector(
    getContactUsLayoutState,
    fromContactUsLayout.contactUsCountLoaded
);
export const contactUsCountFailed = createSelector(
    getContactUsLayoutState,
    fromContactUsLayout.contactUsCountFailed
);
