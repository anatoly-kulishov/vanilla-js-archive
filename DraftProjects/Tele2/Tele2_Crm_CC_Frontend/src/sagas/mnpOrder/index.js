import { APPROVE_ORDER, FETCH_MNP_ORDER, REJECT_ORDER } from 'reducers/mnpOrder/mnpOrderReducer'
import { FETCH_MNP_VERIFICATION } from 'reducers/mnpOrder/mnpVerificationReducer'
import { FETCH_REJECTION_COMMENTS, FETCH_REJECTION_REASONS } from 'reducers/mnpOrder/rejectionInfoReducer'
import { all, takeEvery } from 'redux-saga/effects'

import { approveOrderSaga, fetchMnpOrderSaga, rejectOrderSaga } from './mnpOrderSaga'
import { fetchMnpVerificationSaga } from './mnpVerificationSaga'
import { fetchRejectionCommentsSaga, fetchRejectionReasonsSaga } from './rejectionInfoSaga'

export default function * () {
  yield all([takeEvery(FETCH_MNP_ORDER, fetchMnpOrderSaga)])
  yield all([takeEvery(APPROVE_ORDER, approveOrderSaga)])
  yield all([takeEvery(REJECT_ORDER, rejectOrderSaga)])
  yield all([takeEvery(FETCH_REJECTION_COMMENTS, fetchRejectionCommentsSaga)])
  yield all([takeEvery(FETCH_REJECTION_REASONS, fetchRejectionReasonsSaga)])
  yield all([takeEvery(FETCH_MNP_VERIFICATION, fetchMnpVerificationSaga)])
}
