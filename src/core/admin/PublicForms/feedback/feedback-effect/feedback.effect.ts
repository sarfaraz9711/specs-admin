import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import * as actions from '../feedback-action/feedback.action';
import { catchError } from 'rxjs/operators';
import { FeedbackService } from '../feedback.service';
import { Store } from '@ngrx/store';
import * as store from '../../../../app.state.interface';

@Injectable()
export class FeedbackEffect {

    constructor(private action$: Actions, private feedbackService: FeedbackService, protected appState: Store<store.AppState>) { }

    @Effect()
    feedbackList$: Observable<Action> = this.action$.pipe(
        ofType(actions.ActionTypes.GET_FEEDBACK_LIST),
        map((actions: actions.FeedbackListAction) => actions.payload),
        switchMap(state => {
            return this.feedbackService.getFeedbackList(state).pipe(
                switchMap(record => [new actions.FeedbackListSuccessAction(record)]),
                catchError(error => [new actions.FeedbackListFailAction(error)])

            )
        })
    )
}