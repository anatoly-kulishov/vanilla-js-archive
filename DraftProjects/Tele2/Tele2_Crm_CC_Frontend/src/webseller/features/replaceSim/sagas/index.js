import { all, takeEvery } from 'redux-saga/effects'

import {
  initReplaceSimSaga,
  checkPepCodeSaga,
  getPaperDocumentsSaga,
  getSellAvailabilitySaga,
  getSmsCodeSaga,
  sendSimChangesSaga,
  createInteractionSaga
} from './sagas'
import {
  INIT_REPLACE_SIM_PROCESS,
  CHECK_PEP_CODE,
  GET_PAPER_DOCUMENTS,
  GET_REPLACE_AVAILABILITY,
  GET_SMS_CODE,
  SEND_SIM_CHANGES,
  createInteractionReplaceSim
} from '../reducer'

export default function * () {
  yield all([
    takeEvery(INIT_REPLACE_SIM_PROCESS, initReplaceSimSaga),
    takeEvery(GET_REPLACE_AVAILABILITY, getSellAvailabilitySaga),
    takeEvery(SEND_SIM_CHANGES, sendSimChangesSaga),
    takeEvery(GET_SMS_CODE, getSmsCodeSaga),
    takeEvery(CHECK_PEP_CODE, checkPepCodeSaga),
    takeEvery(GET_PAPER_DOCUMENTS, getPaperDocumentsSaga),
    takeEvery(createInteractionReplaceSim().type, createInteractionSaga)
  ])
}
