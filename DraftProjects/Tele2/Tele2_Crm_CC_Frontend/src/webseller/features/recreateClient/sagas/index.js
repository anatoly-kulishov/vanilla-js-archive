import { all, takeEvery } from 'redux-saga/effects'
import {
  INIT_RECREATE_CLIENT,
  GET_TRANSMITTING_PARTY_DATA,
  GET_RECREATE_CLIENT_DOCUMENTS,
  REQUEST_SMS_CODE,
  VERIFY_SMS_CODE,
  RECREATE_CLIENT,
  ADD_SIGNED_DOCUMENTS
} from 'webseller/features/recreateClient/reducer'
import {
  initRecreateClientSaga,
  getTransmittingPartyDataSaga,
  getRecreateClientDocumentsSaga,
  requestSmsCodeSaga,
  verifySmsCodeSaga,
  recreateClientSaga,
  addSignedDocumentsSaga
} from './sagas'

export default function * () {
  yield all([
    takeEvery(INIT_RECREATE_CLIENT, initRecreateClientSaga),
    takeEvery(GET_TRANSMITTING_PARTY_DATA, getTransmittingPartyDataSaga),
    takeEvery(GET_RECREATE_CLIENT_DOCUMENTS, getRecreateClientDocumentsSaga),
    takeEvery(REQUEST_SMS_CODE, requestSmsCodeSaga),
    takeEvery(VERIFY_SMS_CODE, verifySmsCodeSaga),
    takeEvery(RECREATE_CLIENT, recreateClientSaga),
    takeEvery(ADD_SIGNED_DOCUMENTS, addSignedDocumentsSaga)
  ])
}
