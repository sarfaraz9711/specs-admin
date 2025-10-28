import { createSelector } from 'reselect';
import * as fromFeedback from './feedback-reducer';
import { AppState } from '../../../../app.state.interface';

export const getFeedbackState = (state: AppState) => state.feedback;

// Feedback List
export const feedbackList = createSelector(
    getFeedbackState,
    fromFeedback.feedbackList
  );
  export const feedbackListLoading = createSelector(
    getFeedbackState,
    fromFeedback.feedbackListLoading
  );
  export const feedbackListLoaded = createSelector(
    getFeedbackState,
    fromFeedback.feedbackListLoaded
  );
  export const feedbackListFailed = createSelector(
    getFeedbackState,
    fromFeedback.feedbackListFailed
  );