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
import * as fromRatingReview from './ratingReview.reducer';
// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */
export const getRatingReviewState = (state: AppState) => state.ratingReview;
// product list action
export const getRatingReviewList = createSelector(
  getRatingReviewState,
  fromRatingReview.getRatingReviewList
);
export const getRatingReviewListCount = createSelector(
  getRatingReviewState,
  fromRatingReview.getRatingReviewListCount
);
export const getRatingReviewListDropDown = createSelector(
  getRatingReviewState,
  fromRatingReview.getRatingReviewListDropDown
);
