import { all, takeEvery } from 'redux-saga/effects'
import {
  INIT_CORRECTION_DATA,
  GET_SMS_CODE,
  CHECK_PEP_CODE,
  GET_PAPER_DOCUMENTS,
  EDIT_PERSONAL_DATA,
  ADD_SIGNED_DOCUMENTS_TO_REQUEST,
  createInteractionCorrectionData,
  getVerificationSmsCode,
  checkVerificationPepCode,
  approvePersonalData
} from 'webseller/features/correctionData/reducer'
import {
  initCorrectionDataSaga,
  getSmsCodeSaga,
  checkPepCodeSaga,
  getPaperDocumentsSaga,
  editPersonalDataSaga,
  addSignedDocumentsToRequestSaga,
  createInteractionCorrectionDataSaga,
  getVerificationSmsCodeSaga,
  checkVerificationPepCodeSaga,
  approvePersonalDataSaga
} from './sagas'

export default function * () {
  yield all([
    takeEvery(INIT_CORRECTION_DATA, initCorrectionDataSaga),
    takeEvery(GET_SMS_CODE, getSmsCodeSaga),
    takeEvery(CHECK_PEP_CODE, checkPepCodeSaga),
    takeEvery(GET_PAPER_DOCUMENTS, getPaperDocumentsSaga),
    takeEvery(EDIT_PERSONAL_DATA, editPersonalDataSaga),
    takeEvery(ADD_SIGNED_DOCUMENTS_TO_REQUEST, addSignedDocumentsToRequestSaga),
    takeEvery(createInteractionCorrectionData().type, createInteractionCorrectionDataSaga),
    takeEvery(getVerificationSmsCode().type, getVerificationSmsCodeSaga),
    takeEvery(checkVerificationPepCode().type, checkVerificationPepCodeSaga),
    takeEvery(approvePersonalData().type, approvePersonalDataSaga)
  ])
}
