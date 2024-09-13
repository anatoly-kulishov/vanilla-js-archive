import { all, takeEvery } from 'redux-saga/effects'

import {
  FETCH_PAYD_COMMENTS,
  FETCH_PAYD_SERVICE_TYPES,
  FETCH_PAYD_SERVICE_SIZES,
  FETCH_PAYD_REASON_ADVICE_DESCRIPTION,
  FETCH_AVAILABLE_BALANCES,

  CANCEL_COMPENSATION,
  MODIFY_COMPENSATION,
  ADD_SERVICE_COMPENSATION
} from 'reducers/compensations/compensationsReducer'

import {
  VALIDATE_PAYD_HISTORY,
  VALIDATE_PAYD_SERVICE,
  VALIDATE_PAYD_SERVICE_HISTORY,
  VALIDATE_PAYD_SERVICE_ENABLED,
  VALIDATE_PAYD_SERVICE_AVAILABLE
} from 'reducers/compensations/validationCompensationsReducer'

import {
  fetchPaydCommentsSaga,
  fetchPaydServiceTypesSaga,
  fetchPaydServiceSizesSaga,
  fetchAvailableBalancesSaga,
  fetchPaydReasonAdviceDescriptionSaga,

  cancelCompensationSaga,
  modifyCompensationSaga,
  addServiceCompensationSaga
} from './compensationsSaga'

import {
  validatePaydHistorySaga,
  validatePaydServiceSaga,
  validatePaydServiceHistorySaga,
  validatePaydServiceEnabledSaga,
  validatePaydServiceAvailableSaga
} from './validateCompensationsSaga'

export default function * () {
  yield all([
    takeEvery(FETCH_PAYD_COMMENTS, fetchPaydCommentsSaga),
    takeEvery(FETCH_PAYD_SERVICE_TYPES, fetchPaydServiceTypesSaga),
    takeEvery(FETCH_PAYD_SERVICE_SIZES, fetchPaydServiceSizesSaga),

    takeEvery(VALIDATE_PAYD_HISTORY, validatePaydHistorySaga),
    takeEvery(VALIDATE_PAYD_SERVICE, validatePaydServiceSaga),
    takeEvery(VALIDATE_PAYD_SERVICE_HISTORY, validatePaydServiceHistorySaga),
    takeEvery(VALIDATE_PAYD_SERVICE_ENABLED, validatePaydServiceEnabledSaga),
    takeEvery(VALIDATE_PAYD_SERVICE_AVAILABLE, validatePaydServiceAvailableSaga),

    takeEvery(CANCEL_COMPENSATION, cancelCompensationSaga),
    takeEvery(MODIFY_COMPENSATION, modifyCompensationSaga),
    takeEvery(ADD_SERVICE_COMPENSATION, addServiceCompensationSaga),
    takeEvery(FETCH_PAYD_REASON_ADVICE_DESCRIPTION, fetchPaydReasonAdviceDescriptionSaga),
    takeEvery(FETCH_AVAILABLE_BALANCES, fetchAvailableBalancesSaga)
  ])
}
