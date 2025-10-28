/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import * as actions from '../action/layout.action';
import { ContactUsLayoutState, ContactUsLayoutStateRecord } from './layout.state';

export const initialState: ContactUsLayoutState = new ContactUsLayoutStateRecord() as unknown as ContactUsLayoutState;

export function reducer(
  state = initialState,
  { type, payload }: any
): ContactUsLayoutState {
  if (!type) {
    return state;
  }

  switch (type) {


    /* get customer count action */

    case actions.ActionTypes.GET_CONTACT_US_COUNT: {
      return Object.assign({}, state, {
        contactUsCount: {},
        contactUsCountLoading: true,
        contactUsCountLoaded: false,
        contactUsCountFailed: false,
      });
    }

    case actions.ActionTypes.GET_CONTACT_US_COUNT_SUCCESS: {
        console.log(payload, "Nero in Layout Success")
      return Object.assign({}, state, {
        contactUsCount: payload.data,
        contactUsCountLoading: false,
        contactUsCountLoaded: true,
        contactUsCountFailed: false,
      });
    }

    case actions.ActionTypes.GET_CONTACT_US_COUNT_FAIL: {
      return Object.assign({}, state, {
        contactUsCount: {},
        contactUsCountLoading: false,
        contactUsCountLoaded: false,
        contactUsCountFailed: true,
      });
    }
    default: {
      return state;
    }
  }
}

export const contactUsCount = (state: ContactUsLayoutState) =>
  state.contactUsCount;
export const contactUsCountLoading = (state: ContactUsLayoutState) =>
  state.contactUsCountLoading;
export const contactUsCountLoaded = (state: ContactUsLayoutState) =>
  state.contactUsCountLoaded;
export const contactUsCountFailed = (state: ContactUsLayoutState) =>
  state.contactUsCountFailed;
