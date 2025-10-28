import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as feedbackActions from '../feedback/feedback-action/feedback.action';
import * as store from '../../../app.state.interface';
import {
  feedbackList, 
  feedbackListLoading,
  feedbackListLoaded,
  feedbackListFailed
} from '../feedback/feedback-reducer/feedback-selector';
@Injectable()
export class FeedbackSandbox {
  constructor(protected appState: Store<store.AppState>) {

  }

  public feedbackList$ = this.appState.select(feedbackList);
  public feedbackListLoading$ = this.appState.select(feedbackListLoading);
  public feedbackListLoaded$ = this.appState.select(feedbackListLoaded);
  public feedbackListFailed$ = this.appState.select(feedbackListFailed);

  public getFeedbackList(value: any) {
    this.appState.dispatch(
      new feedbackActions.FeedbackListAction(value)
    );
  }


}