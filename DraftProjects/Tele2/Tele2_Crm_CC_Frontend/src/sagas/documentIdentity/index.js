import { all, takeEvery } from 'redux-saga/effects'
import {
  getApprovedStayingDocumentFieldSaga,
  getApprovedStayingDocumentsSaga,
  getDocumentIdentityCountriesSaga,
  getDocumentIdentityFieldsSaga,
  getDocumentIdentityTypesSaga,
  getIsValidIdentityDocumentPeriodSaga,
  getIsValidStayingDocumentPeriodSaga
} from 'sagas/documentIdentity/documentIdentity'
import {
  GET_APPROVED_STAYING_DOCUMENT_FIELD,
  GET_APPROVED_STAYING_DOCUMENTS,
  GET_DOCUMENT_IDENTITY_COUNTRIES,
  GET_DOCUMENT_IDENTITY_FIELDS,
  GET_DOCUMENT_IDENTITY_TYPES,
  GET_VALIDITY_IDENTITY_DOCUMENT_PERIOD,
  GET_VALIDITY_STAYING_DOCUMENT_PERIOD
} from 'reducers/documentIdentity/documentIdentityReducer'

export default function * () {
  yield all([
    takeEvery(GET_DOCUMENT_IDENTITY_TYPES, getDocumentIdentityTypesSaga),
    takeEvery(GET_DOCUMENT_IDENTITY_FIELDS, getDocumentIdentityFieldsSaga),
    takeEvery(GET_DOCUMENT_IDENTITY_COUNTRIES, getDocumentIdentityCountriesSaga),
    takeEvery(GET_APPROVED_STAYING_DOCUMENTS, getApprovedStayingDocumentsSaga),
    takeEvery(GET_APPROVED_STAYING_DOCUMENT_FIELD, getApprovedStayingDocumentFieldSaga),
    takeEvery(GET_VALIDITY_IDENTITY_DOCUMENT_PERIOD, getIsValidIdentityDocumentPeriodSaga),
    takeEvery(GET_VALIDITY_STAYING_DOCUMENT_PERIOD, getIsValidStayingDocumentPeriodSaga)
  ])
}
