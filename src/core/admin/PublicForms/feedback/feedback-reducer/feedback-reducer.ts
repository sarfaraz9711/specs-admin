import * as actions from "../feedback-action/feedback.action";
import { FeedbackState, FeedbackStateRecord } from './feedback.state';

export const initialState: FeedbackState = new FeedbackStateRecord() as unknown as FeedbackState;

export function reducer(state = initialState, { payload, type }: any): FeedbackState {
    if (!type) {
        return state;
    }

    switch (type) {
        case actions.ActionTypes.GET_FEEDBACK_LIST: {
            console.log(payload, "Nero in feedback Calling")
            return {
                ...state,
                feedbackList: {},
                feedbackListLoading: true,
                feedbackListLoaded: false,
                feedbackListFailed: false
            }
        }
        case actions.ActionTypes.GET_FEEDBACK_LIST_SUCCESS: {
            console.log(payload, "Nero in feedback Successs")
            return {
                ...state,
                feedbackList: payload.data,
                feedbackListLoading: false,
                feedbackListLoaded: true,
                feedbackListFailed: false
            }
        }

        case actions.ActionTypes.GET_FEEDBACK_LIST_FAIL: {
            console.log(payload, "Nero in feedback Failed")
            return {
                ...state,
                feedbackList: {},
                feedbackListLoading: false,
                feedbackListLoaded: false,
                feedbackListFailed: true
            }
        }

       default: {
        return state;
       } 
    }
}

// Feedback list
export const feedbackList = (state: FeedbackState) => state.feedbackList;
export const feedbackListLoading = (state: FeedbackState) => state.feedbackListLoading;
export const feedbackListLoaded = (state: FeedbackState) => state.feedbackListLoaded;
export const feedbackListFailed = (state: FeedbackState) => state.feedbackListFailed;