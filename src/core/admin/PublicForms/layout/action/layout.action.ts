/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { type } from '../../../shared/utility/utilityHelpers';
import { Action } from '@ngrx/store';

export const ActionTypes = {


  GET_CONTACT_US_COUNT: type('[ContactUsLayout] Get Contact Us Count'),
  GET_CONTACT_US_COUNT_SUCCESS: type('[ContactUsLayout] Get Contact Us Success'),
  GET_CONTACT_US_COUNT_FAIL: type('[ContactUsLayout] Get Contact Us Fail'),

};



/* Get Customer Count Actions */

export class GetContactUsCountAction implements Action {
  type = ActionTypes.GET_CONTACT_US_COUNT;
  constructor(public payload: any = null) {}
}

export class GetContactUsCountSuccessAction implements Action {
  type = ActionTypes.GET_CONTACT_US_COUNT_SUCCESS;
  constructor(public payload: any) {}
}

export class GetContactUsCountFailAction implements Action {
  type = ActionTypes.GET_CONTACT_US_COUNT_FAIL;
  constructor(public payload: any = null) {}
}



export type Actions =

  | GetContactUsCountAction
  | GetContactUsCountSuccessAction
  | GetContactUsCountFailAction;
