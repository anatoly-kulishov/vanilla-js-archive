import { all, takeEvery } from 'redux-saga/effects'

import { createNewSession, deleteCurrentSession } from '../reducer/customersCheckReducer'
import { createNewSessionSaga, deleteWebSellerCurrentSessionSaga } from '../sagas/customersCheckSaga'

export default function * () {
  yield all([
    takeEvery(createNewSession().type, createNewSessionSaga),
    takeEvery(deleteCurrentSession().type, deleteWebSellerCurrentSessionSaga)
  ])
}
