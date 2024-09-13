import { all, takeEvery } from 'redux-saga/effects'
import {
  checkIccDuplicateRfa,
  checkPepCodeDuplicateRfa,
  createInteractionDuplicateRfa,
  executeDuplicateRfa,
  getInitialPersonalDataDuplicateRfa,
  getMarkerDuplicateRfa,
  getPaperDocumentsDuplicateRfa,
  getSmsCodeDuplicateRfa
} from 'webseller/features/duplicateRfa/reducer'
import {
  checkIccSaga,
  checkPepCodeSaga,
  createInteractionSaga,
  executeOperationSaga,
  getInitialPersonalDataSaga,
  getMarkerSaga,
  getPaperDocumentsSaga,
  getSmsCodeSaga
} from './sagas'

export default function * () {
  yield all([
    takeEvery(getMarkerDuplicateRfa().type, getMarkerSaga),
    takeEvery(checkIccDuplicateRfa().type, checkIccSaga),
    takeEvery(getInitialPersonalDataDuplicateRfa().type, getInitialPersonalDataSaga),
    takeEvery(getSmsCodeDuplicateRfa().type, getSmsCodeSaga),
    takeEvery(checkPepCodeDuplicateRfa().type, checkPepCodeSaga),
    takeEvery(getPaperDocumentsDuplicateRfa().type, getPaperDocumentsSaga),
    takeEvery(executeDuplicateRfa().type, executeOperationSaga),
    takeEvery(createInteractionDuplicateRfa().type, createInteractionSaga)
  ])
}
