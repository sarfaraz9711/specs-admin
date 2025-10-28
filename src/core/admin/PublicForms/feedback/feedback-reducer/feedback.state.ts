import { Map, Record } from 'immutable';

export interface FeedbackState extends Map<string, any> {
    feedbackList: any;
    feedbackListLoading: boolean,
    feedbackListLoaded: boolean,
    feedbackListFailed: boolean
}

export const FeedbackStateRecord = Record({
    feedbackList: {},
    feedbackListLoading: false,
    feedbackListLoaded: false,
    feedbackListFailed: false
})