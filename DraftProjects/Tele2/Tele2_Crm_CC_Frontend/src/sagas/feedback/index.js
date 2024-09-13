import { all, takeEvery } from 'redux-saga/effects'

import {
  GET_FEEDBACK_TYPES,
  SEND_FEEDBACK,
  CANCEL_FEEDBACK,
  GET_FEEDBACK_COMPONENTS,
  GET_FEEDBACK_TEMPLATES
} from 'reducers/feedbackReducer'
import {
  getFeedbackTypesSaga,
  sendFeedbackSaga,
  cancelFeedbackSaga,
  getFeedbackComponentsSaga,
  getFeedbackTemplatesSaga
} from './feedbackSaga'

export default function * () {
  yield all([
    takeEvery(GET_FEEDBACK_TYPES, getFeedbackTypesSaga),
    takeEvery(SEND_FEEDBACK, sendFeedbackSaga),
    takeEvery(CANCEL_FEEDBACK, cancelFeedbackSaga),
    takeEvery(GET_FEEDBACK_COMPONENTS, getFeedbackComponentsSaga),
    takeEvery(GET_FEEDBACK_TEMPLATES, getFeedbackTemplatesSaga)
  ])
}
