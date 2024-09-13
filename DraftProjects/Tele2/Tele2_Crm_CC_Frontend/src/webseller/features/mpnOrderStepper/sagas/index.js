import { all, takeEvery } from 'redux-saga/effects'

import {
  checkPepCodeSaga,
  checkSimMnpSaga,
  createInteractionMnpOrderSaga,
  createMnpRequestSaga,
  getInitialPersonalDataSaga,
  getMnpAvailableStatusSaga,
  getPaperDocumentsSaga,
  getSmsCodeSaga
} from './sagas'
import {
  checkPepCode,
  checkSimMnp,
  createInteractionMnpOrder,
  createMnpRequest,
  getInitialPersonalDataMnp,
  getMnpAvailableStatus,
  getPaperDocuments,
  getSmsCode
} from '../actions'

export default function * () {
  yield all([
    takeEvery(getMnpAvailableStatus().type, getMnpAvailableStatusSaga),
    takeEvery(checkSimMnp().type, checkSimMnpSaga),
    takeEvery(getInitialPersonalDataMnp().type, getInitialPersonalDataSaga),
    takeEvery(createMnpRequest().type, createMnpRequestSaga),
    takeEvery(getSmsCode().type, getSmsCodeSaga),
    takeEvery(checkPepCode().type, checkPepCodeSaga),
    takeEvery(getPaperDocuments().type, getPaperDocumentsSaga),
    takeEvery(createInteractionMnpOrder().type, createInteractionMnpOrderSaga)
  ])
}
