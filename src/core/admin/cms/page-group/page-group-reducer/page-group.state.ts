/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Map, Record } from 'immutable';

export interface PageGroupState extends Map<string, any> {
  pageGroupList: any;
  pageGroupListCount: any;
  addPagesStatus: any;
  updatePages: any;
  pageGroupDelete: any;
  pageGroupListLoading: boolean;
  pageGroupListLoaded: boolean;
  pageGroupListFailed: boolean;
  pageGroupAddLoading: boolean;
  addPages: {};
  pageGroupAddLoaded: boolean;
  pageGroupAddFailed: boolean;
  pageGroupUpdateLoading: boolean;
  pageGroupUpdateLoaded: boolean;
  pageGroupUpdateFailed: boolean;
  pageGroupDeleteLoading: boolean;
  pageGroupDeleteLoaded: boolean;
  pageGroupDeleteFailed: boolean;
  pageGroupCount: any;
  pageGroupCountLoading: boolean;
  pageGroupCountLoaded: boolean;
  pageGroupCountFailed: boolean;
  pageActiveCount: number;
  pageInactiveCount: number;

  pageCountFailed: boolean;
  pageCountLoading: boolean;
  pageCountLoaded: boolean;
  pageCount: any;

  pageDetailsFailed: boolean;
  pageDetailsLoading: boolean;
  pageDetailsLoaded: boolean;
  pageDetails: any;
}

export const PageGroupStateRecord = Record({
  pageGroupList: {},
  pageGroupListCount: {},
  addPages: {},
  addPagesStatus: {},
  pageGroupDelete: {},
  updatePages: {},
  pageGroupListLoading: false,
  pageGroupListLoaded: false,
  pageGroupListFailed: false,
  pageGroupAddLoading: false,
  pageGroupAddLoaded: false,
  pageGroupAddFailed: false,
  pageGroupUpdateLoading: false,
  pageGroupUpdateLoaded: false,
  pageGroupUpdateFailed: false,
  pageGroupDeleteLoading: false,
  pageGroupDeleteLoaded: false,
  pageGroupDeleteFailed: false,
  pageActiveCount: 0,
  pageInactiveCount: 0,

  pageCountFailed: false,
  pageCountLoading: false,
  pageCountLoaded: false,
  pageCount: {},

  pageDetailsFailed: false,
  pageDetailsLoading: false,
  pageDetailsLoaded: false,
  pageDetails: {},

  pageGroupCountLoading: false,
  pageGroupCountLoaded: false,
  pageGroupCountFailed: false,
  pageGroupCount: {},
});
