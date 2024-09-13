import { all, takeEvery } from 'redux-saga/effects'
import { fetchPhoneNumberCategory } from '../reducer'
import { fetchCategorySaga } from './sagas'

export default function * () {
  yield all([
    takeEvery(fetchPhoneNumberCategory().type, fetchCategorySaga)
  ])
}
