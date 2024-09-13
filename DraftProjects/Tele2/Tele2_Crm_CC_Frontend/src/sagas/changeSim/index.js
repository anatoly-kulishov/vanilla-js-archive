import { all, takeEvery } from 'redux-saga/effects'

import {
  SEND_SMS_REPLACEMENT_SIM,
  VALIDATE_SIM_PROFILE,
  CHANGE_SIM,
  GET_HISTORY_CHANGE_SIM,
  GET_REASONS_CHANGE_SIM
} from 'reducers/changeSim/replacementSimCardReducer'
import {
  sendSmsReplacementSimSaga,
  validateSimProfileSaga,
  changeSimSaga,
  getHistoryChangeSimSaga,
  getReasonsChangeSimSaga
} from './replacementSimCardSaga'

export default function * () {
  yield all([
    takeEvery(SEND_SMS_REPLACEMENT_SIM, sendSmsReplacementSimSaga),
    takeEvery(VALIDATE_SIM_PROFILE, validateSimProfileSaga),
    takeEvery(CHANGE_SIM, changeSimSaga),
    takeEvery(GET_HISTORY_CHANGE_SIM, getHistoryChangeSimSaga),
    takeEvery(GET_REASONS_CHANGE_SIM, getReasonsChangeSimSaga)
  ])
}
