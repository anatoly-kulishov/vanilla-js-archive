import { all, takeEvery } from 'redux-saga/effects'

import {
  checkPepCodeSaga,
  getB2bClientMinimalInfoSaga,
  getPaperDocumentsSaga,
  getSmsCodeSaga,
  getSubscriberPersonalDataSaga,
  sendCodeWordChangesSaga,
  createInteractionSaga
} from './sagas'
import {
  createInteractionChangeCodeWord,
  CHECK_PEP_CODE,
  CHANGE_CODE_WORD,
  GET_B2B_CLIENT_MINIMAL_INFO,
  GET_PAPER_DOCUMENTS,
  GET_SMS_CODE,
  GET_SUBSCRIBER_PERSONAL_DATA
} from '../reducer'

export default function * () {
  yield all([
    takeEvery(GET_SMS_CODE, getSmsCodeSaga),
    takeEvery(CHECK_PEP_CODE, checkPepCodeSaga),
    takeEvery(GET_PAPER_DOCUMENTS, getPaperDocumentsSaga),
    takeEvery(CHANGE_CODE_WORD, sendCodeWordChangesSaga),
    takeEvery(GET_SUBSCRIBER_PERSONAL_DATA, getSubscriberPersonalDataSaga),
    takeEvery(GET_B2B_CLIENT_MINIMAL_INFO, getB2bClientMinimalInfoSaga),
    takeEvery(createInteractionChangeCodeWord().type, createInteractionSaga)
  ])
}
