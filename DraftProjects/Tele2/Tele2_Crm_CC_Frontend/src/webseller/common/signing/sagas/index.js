import { all, takeEvery } from 'redux-saga/effects'
import { CHECK_IS_CLIENT_HAS_PEP } from '../reducer'
import { checkIsClientHasPepSaga } from './sagas'

export default function * () {
  yield all([takeEvery(CHECK_IS_CLIENT_HAS_PEP, checkIsClientHasPepSaga)])
}
