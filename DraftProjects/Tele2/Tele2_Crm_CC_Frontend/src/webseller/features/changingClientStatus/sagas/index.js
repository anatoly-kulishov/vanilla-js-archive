import { all, takeEvery } from 'redux-saga/effects'
import {
  initChangingClientStatus,
  getSmsCodeChangingClientStatus,
  checkPepCodeChangingClientStatus,
  getPaperDocumentsChangingClientStatus,
  createIntercationChangingClientStatus,
  executeOperationChangingClientStatus
} from 'webseller/features/changingClientStatus/actions'
import {
  initChangingClientStatusSaga,
  getSmsCodeChangingClientStatusSaga,
  checkPepCodeChangingClientStatusSaga,
  getPaperDocumentsChangingClientStatusSaga,
  createInteractionChangingClientStatusSaga,
  executeOperationChangingClientStatusSaga
} from './sagas'

export default function * () {
  yield all([
    takeEvery(initChangingClientStatus().type, initChangingClientStatusSaga),
    takeEvery(getSmsCodeChangingClientStatus().type, getSmsCodeChangingClientStatusSaga),
    takeEvery(checkPepCodeChangingClientStatus().type, checkPepCodeChangingClientStatusSaga),
    takeEvery(getPaperDocumentsChangingClientStatus().type, getPaperDocumentsChangingClientStatusSaga),
    takeEvery(createIntercationChangingClientStatus().type, createInteractionChangingClientStatusSaga),
    takeEvery(executeOperationChangingClientStatus().type, executeOperationChangingClientStatusSaga)
  ])
}
