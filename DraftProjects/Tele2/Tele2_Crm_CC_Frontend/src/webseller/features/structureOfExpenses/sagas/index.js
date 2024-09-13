import { all, takeEvery } from 'redux-saga/effects'
import { createInteractionStructureOfExpenses, checkIsAvailableStructureOfExpenses, getUrlStructureOfExpenses } from '../reducer'
import { createInteractionSaga, checkIsAvailableStructureOfExpensesSaga, getUrlStructureOfExpensesSaga } from './sagas'

export default function * () {
  yield all([
    takeEvery(checkIsAvailableStructureOfExpenses().type, checkIsAvailableStructureOfExpensesSaga),
    takeEvery(createInteractionStructureOfExpenses().type, createInteractionSaga),
    takeEvery(getUrlStructureOfExpenses().type, getUrlStructureOfExpensesSaga)
  ])
}
