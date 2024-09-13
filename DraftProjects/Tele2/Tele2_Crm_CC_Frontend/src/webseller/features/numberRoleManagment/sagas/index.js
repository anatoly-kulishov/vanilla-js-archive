import { all, takeEvery } from 'redux-saga/effects'
import {
  executeNumberRoleManagment,
  getPaperDocumentNumberRoleManagment,
  initNumberRoleManagment,
  createInteractionNumberRoleManagment
} from 'webseller/features/numberRoleManagment/reducer'
import {
  executeNumberRoleManagmentSaga,
  getPaperDocumentsSaga,
  initNumberRoleManagmentSaga,
  createInteractionNumberRoleManagmentSaga
} from './sagas'

export default function * () {
  yield all([
    takeEvery(initNumberRoleManagment().type, initNumberRoleManagmentSaga),
    takeEvery(getPaperDocumentNumberRoleManagment().type, getPaperDocumentsSaga),
    takeEvery(executeNumberRoleManagment().type, executeNumberRoleManagmentSaga),
    takeEvery(createInteractionNumberRoleManagment().type, createInteractionNumberRoleManagmentSaga)
  ])
}
