import { all, takeEvery } from 'redux-saga/effects'
import { addSignedDocumentsTerminationClient, executeTerminationClient, getPaperDocumentsTerminationClient, initTerminationClient, verifySmsCodeTerminationClient } from 'webseller/features/terminationClient/reducer'
import { addSignedDocumentsSaga, executeTerminationClientSaga, getPaperDocumentsTerminationClientSaga, initTerminationClientSaga, verifySmsCodeTerminationClientSaga } from './sagas'

export default function * () {
  yield all([
    takeEvery(initTerminationClient().type, initTerminationClientSaga),
    takeEvery(getPaperDocumentsTerminationClient().type, getPaperDocumentsTerminationClientSaga),
    takeEvery(verifySmsCodeTerminationClient().type, verifySmsCodeTerminationClientSaga),
    takeEvery(addSignedDocumentsTerminationClient().type, addSignedDocumentsSaga),
    takeEvery(executeTerminationClient().type, executeTerminationClientSaga)
  ])
}
