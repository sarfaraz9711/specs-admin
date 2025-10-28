/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Map, Record } from 'immutable';

export interface ContactUsLayoutState extends Map<string, any> {

    contactUsCount: any;
    contactUsCountLoading: boolean;
    contactUsCountLoaded: boolean;
    contactUsCountFailed: boolean;
}

export const ContactUsLayoutStateRecord = Record({

    contactUsCount: {},
    contactUsCountLoading: false,
    contactUsCountLoaded: false,
    contactUsCountFailed: false,
});
