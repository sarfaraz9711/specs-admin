/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import {Injectable} from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import * as actions from '../action/layout.action';
import {catchError} from 'rxjs/operators';
import {LayoutService} from '../layout.service';


@Injectable()
export class LayoutEffects {

    constructor(private action$: Actions, private layoutService: LayoutService) {
    }

    @Effect()
    contactUsCount$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.GET_CONTACT_US_COUNT),
            map((action: actions.GetContactUsCountAction) => action.payload),
            switchMap((state) => {
                return this.layoutService.getContactUsCount()
                    .pipe(
                        switchMap((response) => [
                            new actions.GetContactUsCountSuccessAction(response),
                        ]),
                        catchError(error => of(new actions.GetContactUsCountFailAction(error)))
                    );
            })
        );
}
