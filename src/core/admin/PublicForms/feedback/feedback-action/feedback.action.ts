import { type } from '../../../shared/utility/utilityHelpers';
import { Action } from '@ngrx/store';


export const ActionTypes = {
    GET_FEEDBACK_LIST: type("[FEEDBACK] Feedback list "),
    GET_FEEDBACK_LIST_SUCCESS: type("[FEEDBACK] Feedback List Success" ),
    GET_FEEDBACK_LIST_FAIL: type("[FEEDBACK] Feedback list Fail")
}

// FEEDBACK LIST

export class FeedbackListAction implements Action {
    type = ActionTypes.GET_FEEDBACK_LIST;
  
    constructor(public payload: any) {}
  }
  
  export class FeedbackListSuccessAction implements Action {
    type = ActionTypes.GET_FEEDBACK_LIST_SUCCESS;
  
    constructor(public payload: any) {}
  }
  
  export class FeedbackListFailAction implements Action {
    type = ActionTypes.GET_FEEDBACK_LIST_FAIL;
  
    constructor(public payload: any = null) {}
  }

  export type Actions = | FeedbackListAction | FeedbackListSuccessAction | FeedbackListFailAction;